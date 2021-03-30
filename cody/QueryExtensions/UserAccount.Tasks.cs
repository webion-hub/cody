using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using QueryableUser = System.Linq.IQueryable<Cody.Models.UserAccount>;

namespace Cody.QueryExtensions
{
    public static partial class UserAccountQueries
    {
        public static async Task<bool> ExistsAsync(this QueryableUser self, string usernameOrEmail)
        {
            if (string.IsNullOrWhiteSpace(usernameOrEmail))
                return false;

            return await self
                .GetBy(usernameOrEmail)
                .AnyAsync();
        }
    }
}
