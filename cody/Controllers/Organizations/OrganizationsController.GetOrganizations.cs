using Cody.Controllers.Responses.Formatters;
using Cody.Extensions;
using Cody.Models;
using Cody.QueryExtensions;
using Cody.Security.Authorization;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsController : ControllerBase
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetOrganizations(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return BadRequest();

            var organizations = await GetFilteredOrganizationsAsync(filter);
            var response = await SearchResult.FormatAsync(
                results: organizations,
                limit: limit,
                offset: offset
            );

            return Ok(response);
        }

        private async Task<IQueryable<object>> GetFilteredOrganizationsAsync(string filter)
        {
            var user = await HttpContext.GetLoggedUserAsync();
            return _dbContext
                .GetAllOrganizations()
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .FormatFor(user);
        }
    }
}
