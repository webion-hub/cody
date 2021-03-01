using Cody.Extensions;
using Cody.Models;
using Cody.Utility;
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
                s.City,
                s.Country,
            });
        }

        private IQueryable<SchoolAccount> GetAll()
        {
            return _dbContext
                .Schools
                .Include(s => s.State)
                .Where(s => s.State.HasBeenVerified)
                .OrderBy(s => s.Id);
        }

        private static IQueryable<SchoolAccount> FilterSchools(
            IQueryable<SchoolAccount> schools,
            string filter
        ) {
            if (string.IsNullOrWhiteSpace(filter))
                return schools;
            
            return schools
                .BeginSplitSearch(filter)
                .ExecuteWith(st => s =>
                    Regex.IsMatch(s.Id.ToString(), st) ||
                    Regex.IsMatch(s.Name, st, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(s.City, st, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(s.Country, st, RegexOptions.IgnoreCase)
                );
        }
    }
}
