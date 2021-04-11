using Cody.Contexts;
using Cody.Models.Users;
using Cody.QueryExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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
            var rawId = claim.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(rawId, out int userId))
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


        public static int? MaybeGetId(this ClaimsPrincipal claim)
        {
            var rawId = claim.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(rawId, out int userId)
                ? userId
                : null;
        }

        public static int GetId(this ClaimsPrincipal claim)
        {
            var rawId = claim.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(rawId, out int userId)
                ? userId
                : throw new Exception("Cannot retrieve the user's id");
        }
    }
}
