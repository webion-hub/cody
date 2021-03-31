using Cody.Contexts;
using Cody.Models;
using Cody.Models.Organizations;
using Cody.Models.Users;
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
