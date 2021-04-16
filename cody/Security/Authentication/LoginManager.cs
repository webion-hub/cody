using Cody.Models;
using Cody.Models.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Cody.Extensions;

namespace Cody.Security.Authentication
{
    internal class LoginManager
    {
        public const string DEFAULT_SCHEME = 
            CookieAuthenticationDefaults.AuthenticationScheme;

        public static AuthenticationProperties DefaultAuthProperties => new()
        {
            AllowRefresh = true,
            IsPersistent = true,
        };



        public static async Task SignIntoContextAsync(UserAccount user, HttpContext context)
        {
            var dbContext = context.RequestServices.GetCodyContext();
            var principal = GetPrincipalFor(user);

            await RefreshTokenGenerator
                .CreateNew(dbContext, principal.Identity as ClaimsIdentity)
                .GenerateNewTokenForAsync(user);

            await context.SignInAsync(
                scheme: DEFAULT_SCHEME,
                principal: principal,
                properties: DefaultAuthProperties
            );
        }


        public static ClaimsPrincipal GetPrincipalFor(UserAccount user)
        {
            var claimsIdentity = GetIdentityFor(user);
            claimsIdentity.RefreshExpirationTime();

            return new ClaimsPrincipal(claimsIdentity);
        }


        public static ClaimsIdentity GetIdentityFor(UserAccount user)
        {
            var claims = GetClaimsFor(user);
            return new ClaimsIdentity(claims, DEFAULT_SCHEME);
        }

        public static IEnumerable<Claim> GetClaimsFor(UserAccount user) => new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
        };
    }
}
