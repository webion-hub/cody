using cody.Contexts;
using cody.Models;
using cody.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Controllers
{
    [ApiController]
    [Route("profile_picture")]
    public class ProfilePictureController : ControllerBase
    {
        private readonly ILogger<ProfilePictureController> _logger;
        private readonly CodyContext _context;
        private readonly SftpService _sftp;

        public ProfilePictureController(
            ILogger<ProfilePictureController> logger, 
            CodyContext context,
            SftpService sftp
        ) {
            _logger = logger;
            _context = context;
            _sftp = sftp;
        }


        /// <response code="200">The id of the created or updated picture</response>
        [HttpPut]
        [Route("create_or_update")]
        public async Task<IActionResult> CreateOrReplace(
            [FromForm] int accountDetailId,
            [FromForm] IFormFile picture
        ) {
            _logger.LogInformation("Profile picture received -> {AccountDetailId}|{ProfilePicture}", accountDetailId, picture);

            var basePath = @$"/cody_files/users/profile_pictures/{accountDetailId}/";
            var fileName = picture.FileName;

            var profilePicture = new UserProfilePicture {
                AccountDetailId = accountDetailId,
                FilePath = basePath + fileName,
                Picture = picture,
            };

            var wasUploaded = 
                await TryUploadPictureAsync(profilePicture, basePath);

            if (!wasUploaded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            await _context.ProfilePictures.AddAsync(profilePicture);
            await _context.SaveChangesAsync();
            return Ok(profilePicture.Id);
        }


        private async Task<bool> TryUploadPictureAsync(UserProfilePicture profilePicture, string basePath)
        {
            _sftp.MaybeCreateDirectiories(profilePicture.FilePath);
            var wasUploaded = await _sftp.TryUploadFileAsync(
                profilePicture.Picture,
                profilePicture.FilePath
            );

            if (!wasUploaded)
                return false;

            await _sftp.DeleteAllExceptAsync(
                basePath, 
                profilePicture.Picture.FileName
            );

            return true;
        }
    }
}
