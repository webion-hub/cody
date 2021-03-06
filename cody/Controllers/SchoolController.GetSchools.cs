using Cody.Extensions;
using Cody.Models;
using Cody.Utility;
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

namespace Cody.Controllers
{
    public partial class SchoolController : ControllerBase
    {
        [HttpGet("get")]
        [AllowAnonymous]
        public IActionResult Get(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return BadRequest(); 

            var schools = GetFilteredSchools(filter)
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return Ok(schools);
        }


        private IQueryable<object> GetFilteredSchools(string filter)
        {
            var schools = GetAll();
            var filtered = FilterSchools(schools, filter);

            return filtered.Select(s => new
            {
                s.Id,
                s.Name,
                s.Detail.City,
                s.Detail.Country,
            });
        }

        private IQueryable<Organization> GetAll()
        {
            return _dbContext
                .Organizations
                .Include(s => s.State)
                .Where(s => 
                    s.Kind == OrganizationKind.School &&
                    s.State.HasBeenVerified
                )
                .OrderBy(s => s.Id);
        }

        private static IQueryable<Organization> FilterSchools(IQueryable<Organization> schools, string filter) 
        {
            if (string.IsNullOrWhiteSpace(filter))
                return schools;
            
            return schools
                .CreateFilter(filter, FilterKind.SplitWords)
                .Where(k => s =>
                    Regex.IsMatch(s.Id.ToString(), k) ||
                    Regex.IsMatch(s.Name, k, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(s.Detail.City, k, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(s.Detail.Country, k, RegexOptions.IgnoreCase)
                );
        }
    }
}
