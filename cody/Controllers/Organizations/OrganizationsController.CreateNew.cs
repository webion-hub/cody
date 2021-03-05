using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsController : ControllerBase
    {
        [HttpPost("create_new")]
        [Authorize]
        public async Task<IActionResult> CreateNew([FromBody] OrganizationCreationRequest request)
        {
            Organization organization = request;
            if (await OrganizationExists(organization))
                return Conflict();
                        
            SetOwner(organization);

            _dbContext.Organizations.Add(organization);
            await _dbContext.SaveChangesAsync();
            
            return Ok(organization.Id);
        }


        private async Task<bool> OrganizationExists(Organization organization)
        {
            return await _dbContext
                .Organizations
                .Where(o =>
                    o.Kind == organization.Kind &&
                    o.Name == organization.Name
                )
                .AnyAsync();
        }

        private void SetOwner(Organization organization)
        {
            organization.Members = new() {
                new OrganizationMember {
                    Role = OrganizationRole.Owner,
                    UserAccountId = HttpContext.User.GetId(),
                }
            };
        }
    }
}
