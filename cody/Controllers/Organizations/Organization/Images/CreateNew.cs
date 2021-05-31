using Cody.Controllers.Requests;
using Cody.Db.Models.Organizations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Cody.Security.Extensions;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsController : ControllerBase
    {
        [HttpPost("create_new")]
        [Authorize]
        public async Task<IActionResult> CreateNew([FromBody] OrganizationCreationRequest request)
        {
            var organization = request.AsOrganization();
            var existingOrg = 
                await MaybeGetExistingOrganizationAsync(organization);
            
            if (existingOrg is not null)
                return Conflict(existingOrg.Id);

            
            SetCurrentUserAsOwnerFor(organization);

            _dbContext.Organizations.Add(organization);
            await _dbContext.SaveChangesAsync();

            return Created($"organization/{organization.Id}", organization.Id);
        }


        private async Task<Organization> MaybeGetExistingOrganizationAsync(Organization organization)
        {
            return await _dbContext
                .Organizations
                .Where(o =>
                    o.Kind == organization.Kind &&
                    o.Name == organization.Name &&
                    o.Detail.Location == organization.Detail.Location
                )
                .SingleOrDefaultAsync();
        }

        private void SetCurrentUserAsOwnerFor(Organization organization)
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
