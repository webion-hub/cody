using Cody.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class UserController
    {
        [HttpGet("role_in/{organizationId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetRoleIn([FromRoute] int organizationId)
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
                return Ok(null);

            var member = await _dbContext
                .OrganizationMembers
                .FirstOrDefaultAsync(om =>
                    om.OrganizationId == organizationId &&
                    om.UserAccountId == HttpContext.User.GetId()
                );

            return Ok(member?.Role.ToString());
        }
    }
}
