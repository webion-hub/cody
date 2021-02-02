using Cody.Contexts;
using Cody.Controllers.Helpers;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
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


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(string base64Image)
        {
            var picture = await GetUserProfilePictureAsync();
            picture ??= await CreateNewUserPictureAsync();
            picture.Extension = ".base64";

            var uploaded = 
                await _sftp.TryUploadFileAsync(base64Image, picture.FilePath);

            if (!uploaded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            await _sftp.DeleteAllExceptAsync(
                picture.BasePath,
                picture.FileName
            );

            await _dbContext.ProfilePictures.AddAsync(picture);
            await _dbContext.SaveChangesAsync();
            return Ok(picture.Id);
        }


        private async Task<UserProfilePicture> GetUserProfilePictureAsync()
        {
            var user =
                await HttpContext.GetLoggedUserFromAsync(_dbContext);

            var picture = _dbContext
                .ProfilePictures
                .Where(p => p.AccountDetailId == user.AccountDetail.Id);

            return picture.SingleOrDefault();
        }

        private async Task<UserProfilePicture> CreateNewUserPictureAsync()
        {
            var user = await HttpContext.GetLoggedUserFromAsync(_dbContext);
            var accountDetailId = user.AccountDetail.Id;

            return new UserProfilePicture()
            {
                AccountDetailId = accountDetailId,
            };
        }


        [Obsolete("Images are now uploaded in base64 only")]
        [Authorize]
        public async Task<IActionResult> CreateOrReplace([FromForm] IFormFile submitted)
        {
            var picture = await GetUserProfilePictureAsync();
            picture ??= await CreateNewUserPictureAsync();
            picture.FilePath = submitted.FileName;
            picture.Picture = submitted;

            var wasUploaded =
                await TryUploadPictureAsync(picture, picture.FilePath);

            if (!wasUploaded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            await _dbContext.ProfilePictures.AddAsync(picture);
            await _dbContext.SaveChangesAsync();
            return Ok(picture.Id);
        }

        [Obsolete]
        private async Task<bool> TryUploadPictureAsync(UserProfilePicture profilePicture, string basePath)
        {
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
