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
    internal class SessionCookieRefresher
    {
        private readonly CookieValidatePrincipalContext _cookieContext;
        private readonly SessionRefreshCookies _cookies;
        
        private HttpRequest Request => _cookieContext.Request;
        private HttpResponse Response => _cookieContext.Response;


        public static SessionCookieRefresher For(CookieValidatePrincipalContext cookieContext)
        {
            return new(cookieContext);
        }

        public SessionCookieRefresher(CookieValidatePrincipalContext cookieContext)
        {
            _cookieContext = cookieContext;
            _cookies = new SessionRefreshCookies {
                Request = Request,
                Response = Response,
            };
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
        }

        private void MaybeGenerateRefreshToken()
        {
            if (_cookies.Id is not null)
                return;

            var token = UniqueToken.Create();
            var plain = token.Base64PlainTextToken;

            _cookies.Id = 0x000000!;
            _cookies.Token = plain;
        }
    }
}
