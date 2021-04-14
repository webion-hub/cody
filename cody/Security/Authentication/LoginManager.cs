using Cody.Models;
using Cody.Models.Users;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Security.Authentication
{
    internal class LoginManager
    {
        public const string DEFAULT_SCHEME = 
            CookieAuthenticationDefaults.AuthenticationScheme;



        public static async Task SignIntoContextAsync(UserAccount user, HttpContext context)
        {
            await context.SignInAsync(
                scheme: DEFAULT_SCHEME,
                principal: GetPrincipalFor(user),
                properties: DefaultAuthProperties
            );
        }


        public static AuthenticationProperties DefaultAuthProperties => new()
        {
            AllowRefresh = true,
            IsPersistent = true,
            ExpiresUtc = DateTime.Now.AddDays(1),
        };


        public static ClaimsPrincipal GetPrincipalFor(UserAccount user)
        {
            var claimsIdentity = GetIdentityFor(user);
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
