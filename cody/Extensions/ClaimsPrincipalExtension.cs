﻿using Cody.Contexts;
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
            if (!int.TryParse(rawId, out int userId))
                return null;

            return await dbContext
                .UserAccounts
                .Include(u => u.AccountDetail)
                .Include(u => u.AccountState)
                .Include(u => u.AccountRole)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
