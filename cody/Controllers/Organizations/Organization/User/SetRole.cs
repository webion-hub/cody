using Cody.Extensions;
using Cody.Db.Models.Organizations;
using Cody.Db.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationUserController
    {
        [HttpPut("role/{newRole}")]
        [Authorize]
        public async Task<IActionResult> SetRole(int organizationId, int userId, OrganizationRole newRole)
        {
            var isCallerAdmin = await IsCallerAdminOfAsync(organizationId);
            if (!isCallerAdmin)
                return Unauthorized();

            var member = await GetMemberOfAsync(userId, organizationId);
            if (member is null)
                return NotFound();

            member.Role = newRole;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
