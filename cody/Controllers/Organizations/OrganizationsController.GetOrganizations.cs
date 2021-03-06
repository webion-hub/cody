using Cody.Extensions;
using Cody.Models;
using Cody.Utility.QueryFilters;
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
        public IActionResult Get(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return BadRequest();

            var organizations = GetFilteredOrganizations(filter)
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return Ok(organizations);
        }


        private IQueryable<object> GetFilteredOrganizations(string filter)
        {
            var organizations = GetAllOrganizations();
            var filtered = FilterOrganizations(organizations, filter);

            return filtered.Select(o => new
            {
                o.Id,
                o.Name,
                o.State.HasBeenVerified,
                Kind = o.Kind.ToString(),
                Detail = new
                {
                    o.Detail.City,
                    o.Detail.Country,
                    o.Detail.Description,
                    o.Detail.Website,
                },
                Members = o.Members.Select(m => new
                {
                    m.UserAccount.Username,
                    Role = m.Role.ToString(),
                }),
            });
        }

        public IQueryable<Organization> GetAllOrganizations()
        {
            return _dbContext
                .Organizations
                .Include(o => o.Members)
                .Include(o => o.Detail)
                .OrderBy(o => o.Id);
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
                    Regex.IsMatch(o.Detail.City, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Country, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Website, k.Pattern, RegexOptions.IgnoreCase)
                );
        }
    }
}
