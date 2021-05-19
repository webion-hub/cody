using Cody.Models.Organizations;
using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationMemberQueries
    {
        public static IQueryable<object> Format(this IQueryable<OrganizationMember> self)
        {
            return self.Select(om => new
            {
                om.UserAccount.Id,
                om.UserAccount.Username,
                om.UserAccount.AccountDetail.Name,
                om.UserAccount.AccountDetail.Surname,
                Role = om.Role.ToString(),
            });
        }
    }
}
