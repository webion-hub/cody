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
        public async Task<IActionResult> CreateOrReplace([FromForm] UserProfilePicture profilePicture)
        {
            _logger.LogInformation("Profile picture received -> {ProfilePicture}", profilePicture);

            var img = profilePicture.Picture;
            _sftp.UploadFile(
                img,
                $"users/profile_pictures/{img.FileName}"
            );

            await _context.ProfilePictures.AddAsync(profilePicture);
            await _context.SaveChangesAsync();
            return Ok(profilePicture.Id);
        }
    }
}
