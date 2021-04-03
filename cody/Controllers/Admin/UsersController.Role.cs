using Cody.Models.Users;
using Cody.QueryExtensions;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    public partial class UsersController
    {
        [HttpGet("{userId}/role")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetRole([FromRoute] int userId)
        {
            var user = await GetUserWithRoleAsync(userId);
            if (user is null)
                return BadRequest();

            var userRole = user.AccountRole?.Name ?? Roles.User;
            return Ok(userRole);
        }


        [HttpPut("{userId}/role/{role}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> SetRole(
            [FromRoute] int userId,
            [FromRoute] string role
        ) {
            var user = await GetUserWithRoleAsync(userId);
            if (user is null)
                return BadRequest();

            if (!Roles.Exists(role))
                return BadRequest();

            RolesManager.AssignTo(user, role);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        
        private async Task<UserAccount> GetUserWithRoleAsync(int userId)
        {
            return await _dbContext
                .UserAccounts
                .IncludingRole()
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
