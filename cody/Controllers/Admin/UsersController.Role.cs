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

            return Ok(user.Role.ToString());
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

            if (!Roles.TryGet(role, out var userRole))
                return BadRequest();

            user.Role = userRole;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        
        private async Task<UserAccount> GetUserWithRoleAsync(int userId)
        {
            return await _dbContext
                .UserAccounts
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}
