using Cody.Contexts;
using Cody.Extensions;
using Cody.Models.Organizations;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    [Route("api/organization/{organizationId}/user/{userId}")]
    [ApiController]
    [Authorize]
    public class OrganizationUsersController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationUsersController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPut("role/{newRole}")]
        public async Task<IActionResult> SetRole(int organizationId, int callerId, OrganizationRole newRole)
        {
            var calledId = HttpContext.User.GetId();
            var isCallerAdmin = await _dbContext
                .OrganizationMembers
                .IsAdminOfAsync(callerId, organizationId);

            if (!isCallerAdmin)
                return Unauthorized();

            var member = await _dbContext
                .OrganizationMembers
                .FirstOrDefaultAsync(om =>
                    om.OrganizationId == organizationId &&
                    om.UserAccountId == callerId
                );

            if (member is null)
                return NotFound();

            member.Role = newRole;
            return Ok();
        }
    }
}
