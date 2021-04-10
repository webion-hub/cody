using Cody.Extensions;
using Cody.Models.Organizations;
using Cody.QueryExtensions;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
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
                .OrderBy(om =>
                    om.Role == OrganizationRole.Owner ? 1 :
                    om.Role == OrganizationRole.Admin ? 2 :
                    om.Role == OrganizationRole.User  ? 3 : 4
                )
                .ThenBy(om => om.UserAccountId)
                .Select(om => new
                {
                    om.UserAccount.Id,
                    om.UserAccount.Username,
                    Role = om.Role.ToString(),
                })
                .CreateFilter(filter, FilterKind.SplitWords)
                .OnMatchExact(rp => u =>
                    (rp.Name == "id" && u.Id.ToString() == rp.Value) ||
                    (rp.Name == "role" && u.Role == rp.Value)
                )
                .OnDefault(k => u =>
                    Regex.IsMatch(u.Username, k.Pattern, RegexOptions.IgnoreCase)
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
