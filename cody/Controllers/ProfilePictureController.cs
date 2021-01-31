using Cody.Contexts;
using Cody.Controllers.Helpers;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
        public async Task<IActionResult> Get()
        {
            var picture = await GetUserProfilePictureAsync();
            if (picture is null)
                return NoContent();

            var fileStream = 
                await _sftp.DownloadFileAsync(picture.FilePath);

            var extension = picture.Extension;
            var contentType = $"image/{extension}";

            return File(fileStream, contentType);
        }

        private async Task<UserProfilePicture> GetUserProfilePictureAsync()
        {
            var user =
                await HttpContext.GetLoggedUserFromAsync(_dbContext);

            var picture =
                from p in _dbContext.ProfilePictures
                where p.AccountDetailId == user.AccountDetail.Id
                select p;

            return picture.SingleOrDefault();
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> CreateOrReplace([FromForm] IFormFile picture) 
        {
            var info = await UserPictureInfo.GetFrom(
                httpContext: HttpContext,
                dbContext: _dbContext,
                formFile: picture
            );

            var profilePicture = new UserProfilePicture {
                AccountDetailId = info.AccountDetailId,
                FilePath = info.FullPath,
                Picture = picture,
            };

            var wasUploaded = 
                await TryUploadPictureAsync(profilePicture, info.BasePath);

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
