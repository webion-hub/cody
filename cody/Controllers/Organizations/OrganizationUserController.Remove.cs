using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationUserController
    {
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> RemoveUser(int organizationId, int userId)
        {
            var isCallerAdmin = await IsCallerAdminOfAsync(organizationId);
            if (!isCallerAdmin)
                return Unauthorized();

            var member = await GetMemberOfAsync(userId, organizationId);
            if (member is null)
                return NotFound();

            _dbContext.OrganizationMembers.Remove(member);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
