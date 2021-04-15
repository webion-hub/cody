using Cody.Contexts;
using Cody.Extensions;
using Cody.Models.Users;
using Cody.Security.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Security.Authentication
{
    internal class SessionCookieRefresher
    {
        public static DateTime ExpirationTime => DateTime.Now.AddMinutes(2);

        private readonly CookieValidatePrincipalContext _cookieContext;
        private readonly CodyContext _dbContext;


        private ClaimsPrincipal Principal => _cookieContext.Principal;
        private ClaimsIdentity Identity => Principal.Identity as ClaimsIdentity;


        public static SessionCookieRefresher For(CookieValidatePrincipalContext cookieContext)
        {
            return new(cookieContext);
        }

        public SessionCookieRefresher(CookieValidatePrincipalContext cookieContext)
        {
            _cookieContext = cookieContext;
            _dbContext = _cookieContext
                .HttpContext
                .RequestServices
                .GetCodyContext();
        }


        public async Task MaybeRefreshAsync()
        {
            var expirationTime = Identity.MaybeGetExpirationTime();
            var refreshTokenId = Identity.MaybeGetRefreshTokenId();

            if (expirationTime is null || refreshTokenId is null) {
                _cookieContext.RejectPrincipal();
                return;
            }


            if (DateTime.Now < expirationTime)
                return;


            var wasUpdated = await TryUpdateTokenAsync();
            if (!wasUpdated) {
                _cookieContext.RejectPrincipal();
                return;
            }

            Identity.RefreshExpirationTime();
            _cookieContext.ShouldRenew = true;
        }


        private async Task<bool> TryUpdateTokenAsync()
        {
            var user = await MaybeGetUserAsync();
            var userRefreshToken = MaybeGetRefreshTokenOf(user);

            if (!Identity.DoRefreshTokensMatch(userRefreshToken))
                return false;

            await RefreshTokenGenerator
                .CreateNew(_dbContext, Identity)
                .ReplaceExistingTokenForAsync(user, userRefreshToken);

            return true;
        }

        private async Task<UserAccount> MaybeGetUserAsync()
        {
            return await Principal.FetchFromDbAsync(_dbContext,
                user => user.Include(u => u.RefreshTokens)
            );
        }

        private UserRefreshToken MaybeGetRefreshTokenOf(UserAccount user)
        {
            return user?
                .RefreshTokens
                .FirstOrDefault(t => t.Id == Identity.MaybeGetRefreshTokenId());
        }
    }
}
