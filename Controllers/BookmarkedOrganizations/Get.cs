﻿using Cody.Extensions;
using Cody.Db.Models.Organizations;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using Cody.Db.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedOrganizationsController
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            var user = await HttpContext.GetLoggedUserAsync();
            var organizations = GetBookmarkedOrganizationsFor(user)
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .FormatFor(user);

            var result = await SearchResult.FormatAsync(
                results: organizations,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }

        private IQueryable<Organization> GetBookmarkedOrganizationsFor(UserAccount user)
        {
            return _dbContext
                .OrganizationMembers
                .Include(bo => bo.Organization)
                .Where(bo => bo.UserAccountId == user.Id)
                .Where(bo => bo.IsBookmarked)
                .Select(bo => bo.Organization);
        }
    }
}
