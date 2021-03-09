using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        [Authorize]
        public async Task<IActionResult> CreateNew([FromBody] OrganizationCreationRequest request)
        {
            var school = request.AsOrganization();
            if (SchoolExists(school, out var existingSchool))
                return BadRequest(existingSchool.Id);

            school.State = new OrganizationState
            {
                HasBeenVerified = false,
            };

            school.Members = new() {
                new() {
                    Role = OrganizationRole.Owner,
                    UserAccount = await HttpContext.GetLoggedUserAsync(),
                }
            };

            _dbContext.Organizations.Add(school);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation("School created - {School}", school);
            return Ok(school.Id);
        }


        private bool SchoolExists(Organization school, out Organization existingSchool)
        {
            var maybeExisting = _dbContext
                .Organizations
                .Include(o => o.Detail)
                .Where(o =>
                    o.Kind == OrganizationKind.School &&
                    o.Name == school.Name &&
                    o.Detail.City == school.Detail.City &&
                    o.Detail.Country == school.Detail.Country
                );

            existingSchool = maybeExisting.FirstOrDefault();
            return maybeExisting.Any();
        }
    }
}
