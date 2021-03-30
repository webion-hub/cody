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
            var organizations = await GetOrganizationsBasedOnUserRoleAync();
            var filtered = FilterOrganizations(organizations, filter);

            return FormatAsResponse(filtered);
        }


        private static IQueryable<Organization> FilterOrganizations(IQueryable<Organization> organizations, string filter)
        {
            return organizations
                .CreateFilter(filter, FilterKind.SplitWords)
                .MatchDefault();
        }
    }
}
