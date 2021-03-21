using Cody.Extensions;
using Cody.Models;
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
            var response = await SearchResponse.FormatAsync(
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
            if (string.IsNullOrWhiteSpace(filter))
                return organizations;

            return organizations
                .CreateFilter(filter, FilterKind.SplitWords)
                .Where(k => o =>
                    k.AsEnum<OrganizationKind>() == o.Kind ||

                    Regex.IsMatch(o.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Location, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Website, k.Pattern, RegexOptions.IgnoreCase)
                );
        }
    }
}
