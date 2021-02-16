using Cody.Contexts;
using Cody.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class HttpContextExtension
    {
        private const string DEFAULT_SCHEME = CookieAuthenticationDefaults.AuthenticationScheme;


        public static async Task SignInAsync(this HttpContext context, UserAccount user)
        {
            var claims = new[] 
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var claimsIdentity = new ClaimsIdentity(claims, DEFAULT_SCHEME);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            var props = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true,
                ExpiresUtc = DateTime.Now.AddMinutes(20),
            };

            await context.SignInAsync(
                DEFAULT_SCHEME,
                claimsPrincipal,
                props
            );
        }


        public static Task<UserAccount> GetLoggedUserAsync(this HttpContext context)
        {
            var dbContext = context
                .RequestServices
                .GetCodyContext();

            return context.User.FetchFromDbAsync(dbContext);
        }
    }
}
