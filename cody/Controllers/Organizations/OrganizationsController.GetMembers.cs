using Cody.Extensions;
using Cody.QueryExtensions;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsController
    {
        [HttpGet("{organizationId}/members")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMembers(
            [FromRoute] int organizationId,
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            var members = _dbContext
                .OrganizationMembers
                .IncludingUser()
                .Where(om => om.OrganizationId == organizationId)
                .OrderBy(om => om.UserAccountId)
                .Select(om => new
                {
                    om.UserAccount.Id,
                    om.UserAccount.Username,
                    Role = om.Role.ToString(),
                })
                .CreateFilter(filter, FilterKind.SplitWords)
                .OnMatchExact(rp => u =>
                    (rp.Name == "id" && u.Id.ToString() == rp.Value) || 
                    (rp.Name == "username" && u.Username == rp.Value)
                )
                .Filter();

            var result = await SearchResult.FormatAsync(
                results: members,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }
    }
}
