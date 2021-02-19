﻿using Cody.Contexts;
using Cody.Models;
using Cody.Security.Authentication;
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
        public static async Task SignInAsync(this HttpContext context, UserAccount user)
        {
            await context.SignInAsync(
                scheme: LoginManager.DEFAULT_SCHEME,
                principal: LoginManager.GetPrincipalFor(user),
                properties: LoginManager.DefaultAuthProperties
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
