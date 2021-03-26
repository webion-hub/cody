using Cody.Extensions;
using Cody.QueryExtensions;
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
