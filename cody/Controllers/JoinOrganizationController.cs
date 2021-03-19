using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("user/join")]
    [Authorize]
    public class JoinOrganizationController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public JoinOrganizationController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost("{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Join(int organizationId)
        {
            var userId = HttpContext.User.GetId();
            var organization = await _dbContext
                .Organizations
                .Include(o => o.Members)
                .FirstOrDefaultAsync(o => o.Id == organizationId);

            if (organization is null)
                return BadRequest();

            if (organization.Members.Any(m => m.UserAccountId == userId))
                return Ok();

            organization.Members.Add(new() {
                UserAccountId = userId,
                Role = OrganizationRole.User,
            });

            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
