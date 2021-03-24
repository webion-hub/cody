using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class ProfilePictureController
    {
        [HttpGet("{userId}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> GetFor(int userId)
        {
            var user = await _dbContext
                .UserAccounts
                .Include(u => u.AccountDetail)
                    .ThenInclude(ad => ad.ProfilePicture)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
                return NotFound();

            var picture = user.AccountDetail.ProfilePicture;
            if (picture is null)
                return NoContent();

            var fileStream =
                await _sftp.DownloadFileAsync(picture.FilePath);

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
                await _sftp.DownloadFileAsync(picture.FilePath);

            return File(fileStream, picture.ContentType);
        }
    }
}
