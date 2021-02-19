using Cody.Contexts;
using Cody.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    public class SessionCookieRefresher
    {
        private readonly CookieValidatePrincipalContext _cookieContext;
        private HttpRequest Request => _cookieContext.Request;
        private HttpResponse Response => _cookieContext.Response;


        public static SessionCookieRefresher For(CookieValidatePrincipalContext cookieContext)
        {
            return new(cookieContext);
        }

        public SessionCookieRefresher(CookieValidatePrincipalContext cookieContext)
        {
            _cookieContext = cookieContext;
        }


        public async Task MaybeRefreshAsync()
        {
            var dbContext = _cookieContext
                .HttpContext
                .RequestServices
                .GetCodyContext();

            var user = await _cookieContext
                .Principal
                .FetchFromDbAsync(dbContext);

            var isUserAuthenticated = _cookieContext
                .Principal
                .Identity
                .IsAuthenticated;

            if (isUserAuthenticated) {
                MaybeGenerateRefreshToken();
                return;
            }

            if (user is not null)
                return;

            if (Request.Cookies.ContainsKey("refresh_token"))
                ;
        }

        private void MaybeGenerateRefreshToken()
        {
            if (Request.Cookies.ContainsKey("refresh_token"))
                return;

            var token = UniqueToken.Create();
            var plain = Convert.ToBase64String(token.PlainTextToken);

            Response.Cookies.Append("refresh_token", plain, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
        }
    }
}
