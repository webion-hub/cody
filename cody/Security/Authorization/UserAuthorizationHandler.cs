using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    public class UserAuthorizationHandler : AuthorizationHandler<RolesAuthorizationRequirement>, IAuthorizationHandler
    {
        private readonly CodyContext _dbContext;

        public UserAuthorizationHandler(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context, 
            RolesAuthorizationRequirement requirement
        ) {
            if (!IsUserAuthenticated(context)) {
                context.Fail();
                return;
            }


            var user = await context
                .User
                .FetchFromDbAsync(_dbContext);

            var isUserAllowed = requirement
                .AllowedRoles
                .Contains(user.AccountRole?.Name);


            if (!isUserAllowed) {
                context.Fail();
                return;   
            }

            context.Succeed(requirement);
        }

        private static bool IsUserAuthenticated(AuthorizationHandlerContext context)
        {
            var user = context.User;
            return 
                user is not null && 
                user.Identity.IsAuthenticated;
        }
    }
}
