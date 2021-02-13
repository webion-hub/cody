using Cody.Contexts;
using Cody.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class ClaimsPrincipalExtension
    {
        public static async Task<UserAccount> FetchFromDbAsync(this ClaimsPrincipal claim, CodyContext dbContext)
        {
            var rawId = claim.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.Parse(rawId);

            return await dbContext
                .UserAccounts
                .Include(u => u.AccountDetail)
                .Include(u => u.AccountState)
                .Include(u => u.AccountRole)
                .FirstAsync(u => u.Id == userId);
        }
    }
}
