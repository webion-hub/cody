using Cody.Models.Organizations;
using System.Linq;
using QueryableMember = System.Linq.IQueryable<Cody.Models.Organizations.OrganizationMember>;
using OrderedMember = System.Linq.IOrderedQueryable<Cody.Models.Organizations.OrganizationMember>;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationMemberQueries
    {
        public static OrderedMember OrderByRole(this QueryableMember self)
        {
            return self.OrderBy(om =>
                om.Role == OrganizationRole.Owner ? 1 :
                om.Role == OrganizationRole.Admin ? 2 :
                om.Role == OrganizationRole.User  ? 3 : 4
            );
        }
        
        public static OrderedMember ThenById(this OrderedMember self)
        {
            return self.ThenBy(om => om.UserAccountId);
        }

        public static QueryableMember ThatAreAdmins(this QueryableMember self)
        {
            return self.Where(om =>
                om.Role == OrganizationRole.Admin ||
                om.Role == OrganizationRole.Owner
            );
        }
    }
}
