using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Security;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly CodyContext _dbContext;
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;

        public LoginController(
            ILogger<LoginController> logger, 
            CodyContext dbContext, 
            PersistentLoginCookieEmitterService cookieEmitter
        ) {
            _logger = logger;
            _dbContext = dbContext;
            _cookieEmitter = cookieEmitter;
        }


        /// <response code="200">The login was successfull</response>
        /// <response code="404">The username wasn't found</response>
        /// <response code="400">The passwords didn't match</response>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> TryLoginAsync([FromBody] UserLoginRequest request) 
        {
            if (string.IsNullOrWhiteSpace(request.Username))
                return NotFound();

            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest();

            if (!TryGetUser(request.Username, out var user))
                return NotFound();

            
            var isPasswordCorrect =
                Password.AreEqual(request.Password, user.Password);

            if (!isPasswordCorrect) 
            {
                _logger.LogWarning($"User {request.Username} -> incorrect password");
                return BadRequest();
            }

            await HttpContext.SignInAsync(user);

            if (request.RememberMe)
                await _cookieEmitter.EmitAndAttachToResponseAsync(user, Response);

            return Ok();
        }


        private bool TryGetUser(string username, out UserAccount user)
        {
            user = null;
            var maybeUser =
                _dbContext.MaybeGetUserBy(username);

            var userExists = maybeUser.Any();
            if (!userExists)
                return false;

            user = maybeUser.Single();
            return true;
        }
    }
}
