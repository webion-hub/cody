using Cody.Contexts;
using Cody.Models;
using Cody.QueryExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class ClaimsPrincipalExtension
    {
        public static async Task<UserAccount> FetchFromDbAsync(this ClaimsPrincipal claim, CodyContext dbContext)
        {
            var rawId = claim.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(rawId, out int userId))
                return null;

            return await dbContext
                .UserAccounts
                .IncludingDetail()
                .IncludingState()
                .IncludingRole()
                .FirstOrDefaultAsync(u => u.Id == userId);
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
