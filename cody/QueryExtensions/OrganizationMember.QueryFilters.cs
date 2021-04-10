using Cody.Models.Organizations;
using Cody.Utilities.QueryFilters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationMemberQueries
    {
        public static IQueryable<OrganizationMember> DefaultMatch(this QueryFilter<OrganizationMember> self)
        {
            return self
                .OnMatchExact(rp => om =>
                    (rp.Name == "id" && om.UserAccount.Id.ToString() == rp.Value) ||
                    (rp.Name == "role" && om.Role.ToString() == rp.Value)
                )
                .OnDefault(k => om =>
                    Regex.IsMatch(om.UserAccount.Username, k.Pattern, RegexOptions.IgnoreCase)
                )
                .Filter();
        }
    }
}
