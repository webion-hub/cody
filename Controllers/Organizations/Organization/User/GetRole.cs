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
        [HttpGet("role")]
        [Authorize]
        public async Task<IActionResult> GetRole(int organizationId, int userId)
        {
            var isCallerAdmin = await IsCallerAdminOfAsync(organizationId);
            if (!isCallerAdmin)
                return Unauthorized();

            var member = await GetMemberOfAsync(userId, organizationId);
            if (member is null)
                return NotFound();

            return Ok(member.Role.ToString());
        }
    }
}
