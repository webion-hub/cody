using Cody.Db.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cody.Security.Extensions;

namespace Cody.Controllers
{
    public partial class ProfilePictureController
    {
        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFor(int userId)
        {
            var user = await _dbContext
                .UserAccounts
                .IncludingProfilePicture()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
                return NotFound();

            var picture = user.AccountDetail.ProfilePicture;
            if (picture is null)
                return NoContent();

            var fileStream =
                await _sftp.DownloadFileAsync(picture);

            Response.AddNoCacheControlHeader();
            return File(fileStream, picture.ContentType);
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var picture = await GetUserProfilePictureAsync();
            if (picture is null)
                return NoContent();

            var fileStream =
                await _sftp.DownloadFileAsync(picture);

            Response.AddNoCacheControlHeader();
            return File(fileStream, picture.ContentType);
        }
    }
}
