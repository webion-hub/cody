using System.Linq;
using QueryableMember = System.Linq.IQueryable<Cody.Models.Organizations.OrganizationMember>;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
  public static partial class OrganizationMemberQueries
    {
        public static async Task<bool> IsAdminOfAsync(this QueryableMember self, int userId, int organizationId)
        {
            return await self
                .Where(om => om.OrganizationId == organizationId)
                .ThatAreAdmins()
                .AnyAsync(om => om.UserAccountId == userId);
        }
    }
}
