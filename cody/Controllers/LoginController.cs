using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.QueryExtensions;
using Cody.Security;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class LoginController : ControllerBase
    {
        private readonly CodyContext _dbContext;
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;

        public LoginController(
            CodyContext dbContext, 
            PersistentLoginCookieEmitterService cookieEmitter
        ) {
            _dbContext = dbContext;
            _cookieEmitter = cookieEmitter;
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> TryLoginAsync([FromBody] UserLoginRequest request) 
        {
            var user = await MaybeGetUserAsync(request.Username);
            if (user is null)
                return NotFound();

            var isPasswordCorrect =
                await Password.AreEqualAsync(request.Password, user.Password);
            
            if (!isPasswordCorrect)
                return BadRequest();

            await HttpContext.SignInAsync(user);

            if (request.RememberMe is true)
                await _cookieEmitter.EmitAndAttachToResponseAsync(user, Response);

            return Ok();
        }


        private async Task<UserAccount> MaybeGetUserAsync(string username)
        {
            return await _dbContext
                .MaybeGetUserBy(username)
                .IncludingPassword().WithMetadata()
                .SingleOrDefaultAsync();
        }
    }
}
