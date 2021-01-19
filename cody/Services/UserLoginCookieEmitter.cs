using cody.Contexts;
using cody.Models;
using cody.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace cody.Services
{
    public class UserLoginCookieEmitter
    {
        private readonly ILogger<UserLoginCookieEmitter> _logger;
        private readonly CodyContext _dbContext;

        public UserLoginCookieEmitter(ILogger<UserLoginCookieEmitter> logger, CodyContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }


        public async Task<(int, string)> EmitPersistentLoginCookieForAsync(UserAccount user)
        {
            var cookie = UniqueKey.Create();
            var userCookie = new UserAccountPersistentLoginCookie
            {
                UserAccount = user,
                Cookie = cookie.HashedKey,
                Salt = cookie.Salt,
            };

            await _dbContext.LoginCookies.AddAsync(userCookie);
            await _dbContext.SaveChangesAsync();

            return (
                userCookie.Id,
                Convert.ToBase64String(cookie.PlainTextKey)
            );
        }


        public async Task<UserAccount> TryLoginAsync(int storedCookieId, string plainTextCookie)
        {
            try
            {
                var storedCookie = 
                    await GetStoredCookieOrThrowAsync(storedCookieId);

                ConsumeCookieOrThrow(plainTextCookie, storedCookie);
                return storedCookie.UserAccount;
            }
            catch (AttemptedCookieBreachException e) 
            when (e.AffectedAccount is null)
            {
                return null;
            }
            catch (AttemptedCookieBreachException e)
            {
                DropAllCookiesFor(e.AffectedAccount);
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
            string plainTextCookie,
            UserAccountPersistentLoginCookie storedCookie
        ) {
            var areEqual = 
                AreCookiesEqual(plainTextCookie, storedCookie);

            if (!areEqual)
                throw new AttemptedCookieBreachException(storedCookie.UserAccount);

            _dbContext
                .LoginCookies
                .Remove(storedCookie);
        }


        private static bool AreCookiesEqual(
            string plainTextCookie,
            UserAccountPersistentLoginCookie storedCookie
        ) {
            var submittedCookie = UniqueKey.From(
                plainKey: Convert.FromBase64String(plainTextCookie), 
                salt: storedCookie.Salt
            );

            return UniqueKey.AreEqual(submittedCookie, storedCookie.Cookie);
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
