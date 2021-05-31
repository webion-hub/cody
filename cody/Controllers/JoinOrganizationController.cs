using Cody.Db;
using Cody.Security.Extensions;
using Cody.Db.Models.Organizations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("api/user")]
    [Authorize]
    public class JoinOrganizationController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public JoinOrganizationController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost("join/{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Join(int organizationId)
        {
            var userId = HttpContext.User.GetId();
            var organization = await GetOrganizationAsync(organizationId);

            if (organization is null)
                return BadRequest();

            if (IsMember(userId, organization))
                return Ok();

            organization.Members.Add(new() {
                UserAccountId = userId,
                Role = OrganizationRole.User,
                IsBookmarked = false,
            });

            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpPost("leave/{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Leave(int organizationId)
        {
            var userId = HttpContext.User.GetId();
            var organization = await GetOrganizationAsync(organizationId);

            if (organization is null)
                return BadRequest();

            var member = organization
                .Members
                .FirstOrDefault(m => m.UserAccountId == userId);

            if (member is null)
                return NotFound();

            if (member.Role == OrganizationRole.Owner)
                return StatusCode(StatusCodes.Status403Forbidden);

            organization.Members.Remove(member);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        private async Task<Organization> GetOrganizationAsync(int organizationId)
        {
            return await _dbContext
                .Organizations
                .Include(o => o.Members)
                .FirstOrDefaultAsync(o => o.Id == organizationId);
        }

        private static bool IsMember(int userId, Organization organization)
        {
            return organization
                .Members
                .Any(m => m.UserAccountId == userId);
        }
    }
}
