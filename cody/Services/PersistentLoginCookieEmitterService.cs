using Cody.Contexts;
using Cody.Extensions;
using Cody.Models.Users;
using Cody.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Services
{
    public record PersistentLoginCookie(int Id, string Token);


    public class PersistentLoginCookieEmitterService
    {
        private readonly ILogger<PersistentLoginCookieEmitterService> _logger;
        private readonly CodyContext _dbContext;

        public PersistentLoginCookieEmitterService(
            ILogger<PersistentLoginCookieEmitterService> logger, 
            CodyContext dbContext
        ) {
            _logger = logger;
            _dbContext = dbContext;
        }


        public async Task EmitAndAttachToResponseAsync(UserAccount user, HttpResponse response)
        {
            var (id, token) =
                await EmitPersistentLoginCookieForAsync(user);

            response.SetLoginCookies(id, token);
        }


        public async Task<PersistentLoginCookie> EmitPersistentLoginCookieForAsync(UserAccount user)
        {
            var cookie = UniqueToken.Create();
            var userCookie = new UserAccountPersistentLoginCookie
            {
                UserAccount = user,
                Token = cookie.HashedToken,
                Salt = cookie.Salt,
            };

            _dbContext.LoginCookies.Add(userCookie);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation("Created login cookie - {Cookie}", userCookie);
            return new (
                Id: userCookie.Id,
                Token: Convert.ToBase64String(cookie.PlainTextToken)
            );
        }


        public async Task<UserAccount> TryLoginAsync(int storedCookieId, string plainTextToken)
        {
            try
            {
                var storedCookie = 
                    await GetStoredCookieOrThrowAsync(storedCookieId);

                ConsumeCookieOrThrow(plainTextToken, storedCookie);
                _logger.LogInformation(
                    "Consumed login cookie {Cookie}", storedCookie);

                return storedCookie.UserAccount;
            }
            catch (AttemptedCookieBreachException e) when (e.AffectedUser is null)
            {
                _logger.LogWarning("Attempted cookie breach");
                return null;
            }
            catch (AttemptedCookieBreachException e)
            {
                DropAllCookiesFor(e.AffectedUser);
                _logger.LogWarning(
                    "Attempted cookie breach - dropped all tokens for {User}", e.AffectedUser);
                
                return null;
            }
            finally 
            {
                await _dbContext.SaveChangesAsync();
            }
        }


        private async Task<UserAccountPersistentLoginCookie> GetStoredCookieOrThrowAsync(int cookieId)
        {
            var cookie = await _dbContext
                .LoginCookies
                .Include(c => c.UserAccount)
                .FirstOrDefaultAsync(c => c.Id == cookieId);
            
            if (cookie is null)
                throw new AttemptedCookieBreachException(null);

            return cookie;
        }


        private void ConsumeCookieOrThrow(
            string plainTextToken,
            UserAccountPersistentLoginCookie storedCookie
        ) {
            var areEqual = 
                AreTokensEqual(plainTextToken, storedCookie);

            if (!areEqual)
                throw new AttemptedCookieBreachException(storedCookie.UserAccount);

            _dbContext
                .LoginCookies
                .Remove(storedCookie);
        }


        private static bool AreTokensEqual(
            string plainTextToken,
            UserAccountPersistentLoginCookie storedCookie
        ) {
            var submittedCookie = UniqueToken.From(
                plainTextToken: Convert.FromBase64String(plainTextToken), 
                salt: storedCookie.Salt
            );

            return UniqueToken.AreEqual(submittedCookie, storedCookie.Token);
        }


        private void DropAllCookiesFor(UserAccount user)
        {
            var affectedCookies = _dbContext
                .LoginCookies
                .Where(c => c.UserAccountId == user.Id);

            _dbContext.LoginCookies.RemoveRange(affectedCookies);
        }
    }
}
