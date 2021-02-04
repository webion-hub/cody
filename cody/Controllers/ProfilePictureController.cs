using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Linq;
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


        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete()
        {
            var picture = await GetUserProfilePictureAsync();
            if (picture is null)
                return BadRequest();

            var deleted = _sftp.TryDeleteFile(picture.FilePath);
            if (!deleted)
                return StatusCode(500);

            _dbContext.Remove(picture);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromForm] ProfilePicturePutRequest request)
        {
            var picture = await GetUserProfilePictureAsync();
            picture ??= await CreateNewUserPictureAsync();

            var uploaded = await TryUploadAsync(request, picture);
            if (!uploaded)
                return StatusCode(500);
            
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

            var picture = new UserProfilePicture()
            {
                AccountDetailId = accountDetailId,
            };

            _dbContext.ProfilePictures.Add(picture);
            return picture;
        }

        private async Task<bool> TryUploadAsync(
            ProfilePicturePutRequest request,
            UserProfilePicture picture
        ) {
            using var webpStream = request.AsWebPImageStream();
            picture.Extension = ".webp";

            var uploaded =
                await _sftp.TryUploadFileAsync(webpStream, picture.FilePath);

            return uploaded;
        }
    }
}
