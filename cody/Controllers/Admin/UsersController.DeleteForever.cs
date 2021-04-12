using Cody.Extensions;
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
        [HttpDelete("delete_forever/{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> DeleteForever(int id)
        {
            var userId = HttpContext.User.GetId();
            if (userId == id)
                return BadRequest();

            var user = await GetUserAsync(id);
            if (user is null)
                return NotFound();

            var pictureDeleted = TryDeleteProfilePicture(user);
            if (!pictureDeleted)
                return Problem();

            _dbContext.UserAccounts.Remove(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        private async Task<UserAccount> GetUserAsync(int userId)
        {
            return await _dbContext
                .UserAccounts
                .IncludingOrganizations()
                .IncludingDetail()
                .IncludingPassword()
                .IncludingTheme()
                .IncludingProfilePicture()
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        private bool TryDeleteProfilePicture(UserAccount user)
        {
            var path = user.AccountDetail.ProfilePicture.FilePath;
            return _sftp.TryDeleteFile(path);
        }
    }
}
