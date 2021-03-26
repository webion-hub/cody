using Cody.Contexts;
using Cody.Models;
using Cody.QueryExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class CodyContextExtensions
    {
        public static bool UserExists(this CodyContext context, string usernameOrEmail)
        {
            if (string.IsNullOrWhiteSpace(usernameOrEmail))
                return false;

            var userExists = context
                .MaybeGetUserBy(usernameOrEmail)
                .Any();

            return userExists;
        }


        public static IQueryable<UserAccount> MaybeGetUserBy(this CodyContext context, string usernameOrEmail)
        {
            var maybeUser =
                from user in context.UserAccounts
                where
                    user.Username == usernameOrEmail ||
                    user.Email == usernameOrEmail
                select user;

            return maybeUser;
        }


        public static IQueryable<Organization> GetAllOrganizations(this CodyContext context)
        {
            return context
                .Organizations
                .IncludingMembers()
                .IncludingState()
                .IncludingDetail()
                .IncludingLogo()
                .IncludingCover();
        }


        public static async Task<bool> IsUserOwnerOfAsync(
            this CodyContext context, 
            UserAccount user, 
            Organization organization
        ) {
            return await context
                .OrganizationMembers
                .AnyAsync(om =>
                    om.OrganizationId == organization.Id &&
                    om.UserAccountId == user.Id &&
                    om.Role == OrganizationRole.Owner
                );
        }
    }
}
