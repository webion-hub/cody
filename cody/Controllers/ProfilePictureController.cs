using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("profile_picture")]
    [Authorize]
    public class ProfilePictureController : ControllerBase
    {
        private readonly ILogger<ProfilePictureController> _logger;
        private readonly CodyContext _dbContext;
        private readonly SftpService _sftp;

        public ProfilePictureController(
            ILogger<ProfilePictureController> logger, 
            CodyContext dbContext,
            SftpService sftp
        ) {
            _logger = logger;
            _dbContext = dbContext;
            _sftp = sftp;
        }


        /// <response code="200">The id of the created or updated picture</response>
        [HttpPut]
        [Route("create_or_update")]
        [Authorize]
        public async Task<IActionResult> CreateOrReplace([FromForm] IFormFile picture) 
        {
            var user = await HttpContext.GetLoggedUserFromAsync(_dbContext);
            var accountDetailId = user.AccountDetail.Id;

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

            await _dbContext.ProfilePictures.AddAsync(profilePicture);
            await _dbContext.SaveChangesAsync();
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
