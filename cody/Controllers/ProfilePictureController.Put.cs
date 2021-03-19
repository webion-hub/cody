using Cody.Controllers.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class ProfilePictureController
    {
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] ImagePutRequest request)
        {
            var picture = await GetUserProfilePictureAsync();
            picture ??= await CreateNewUserPictureAsync();

            var uploaded = await _sftp.TryUploadImageAsync(request, picture);
            if (!uploaded)
                return Problem("sftp connection error");

            await _dbContext.SaveChangesAsync();
            return Ok(picture.Id);
        }
    }
}
