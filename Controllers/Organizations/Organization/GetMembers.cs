using Cody.Extensions;
using Cody.Db.Models.Organizations;
using Cody.Db.Extensions;
using Cody.Db.QueryFilters;
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
    public partial class OrganizationController
    {
        [HttpGet("members")]
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
                .OrderByRole().ThenById()
                
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .Format();

            var result = await SearchResult.FormatAsync(
                results: members,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }
    }
}
