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
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete()
        {
            var picture = await GetUserProfilePictureAsync();
            if (picture is null)
                return BadRequest();

            var deleted = _sftp.TryDeleteFile(picture.FilePath);
            if (!deleted)
                return Problem("sftp connection error");

            _dbContext.Remove(picture);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
