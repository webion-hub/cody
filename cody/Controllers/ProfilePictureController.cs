using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Cody.Services.Sftp;
using Cody.Utilities;
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
    [Route("user/profile_picture")]
    [Authorize]
    public partial class ProfilePictureController : ControllerBase
    {
        private readonly CodyContext _dbContext;
        private readonly SftpService _sftp;

        public ProfilePictureController(
            CodyContext dbContext,
            SftpService sftp
        ) {
            _dbContext = dbContext;
            _sftp = sftp;
        }


        private async Task<UserProfilePicture> GetUserProfilePictureAsync()
        {
            var user =
                await HttpContext.GetLoggedUserAsync();

            var picture = _dbContext
                .ProfilePictures
                .Where(p => p.AccountDetailId == user.AccountDetail.Id);

            return picture.SingleOrDefault();
        }

        private async Task<UserProfilePicture> CreateNewUserPictureAsync()
        {
            var user = await HttpContext.GetLoggedUserAsync();
            var accountDetailId = user.AccountDetail.Id;

            var picture = new UserProfilePicture()
            {
                AccountDetailId = accountDetailId,
            };

            _dbContext.ProfilePictures.Add(picture);
            return picture;
        }
    }
}
