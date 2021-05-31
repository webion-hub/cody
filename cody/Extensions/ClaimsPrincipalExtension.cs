using Cody.Db;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Cody.Security.Extensions;

namespace Cody.Extensions
{
    internal static class ClaimsPrincipalExtension
    {
        public delegate IQueryable<UserAccount> Includer(IQueryable<UserAccount> user);


        public static async Task<UserAccount> FetchFromDbAsync(
            this ClaimsPrincipal claim,
            CodyContext dbContext,
            Includer include = null 
        ) {
            var userId = claim.MaybeGetId();
            if (userId is null)
                return null;

            var query = dbContext
                .UserAccounts
                .IncludingDetail()
                .IncludingState()
                .AsQueryable();

            if (include is not null)
                query = include(query);

            return await query.FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
