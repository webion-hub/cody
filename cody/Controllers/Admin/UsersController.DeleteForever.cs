using Cody.Extensions;
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
        [HttpDelete("delete_forever/{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteForever(int id)
        {
            var userId = HttpContext.User.GetId();
            if (userId == id)
                return BadRequest();

            var target = await _dbContext
                .UserAccounts
                .IncludingOrganizations()
                .IncludingDetail()
                .IncludingPassword()
                .IncludingTheme()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (target is null)
                return NotFound();

            _dbContext.UserAccounts.Remove(target);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
