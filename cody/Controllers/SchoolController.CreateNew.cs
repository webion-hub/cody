using Cody.Controllers.Requests;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class SchoolController : ControllerBase
    {
        [HttpPost("create_new")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateNew([FromBody] SchoolCreationRequest request)
        {
            SchoolAccount school = request;
            if (SchoolExists(school, out var existingSchool))
                return BadRequest(existingSchool.Id);

            school.State = new SchoolAccountState
            {
                HasBeenVerified = false,
            };

            _dbContext.Schools.Add(school);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation("School created - {School}", school);
            return Ok(school.Id);
        }


        private bool SchoolExists(SchoolAccount school, out SchoolAccount existingSchool)
        {
            var maybeExisting =
                from s in _dbContext.Schools
                where
                    s.Name == school.Name &&
                    s.City == school.City &&
                    s.Country == school.Country
                select s;

            existingSchool = maybeExisting.FirstOrDefault();
            return maybeExisting.Any();
        }
    }
}
