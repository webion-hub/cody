using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
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
            if (!TryGetUser(request.Username, out var user))
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


        private bool TryGetUser(string username, out UserAccount user)
        {
            user = null;
            var maybeUser = _dbContext
                .MaybeGetUserBy(username)
                .Include(u => u.Password)
                    .ThenInclude(p => p.Metadata);

            var userExists = maybeUser.Any();
            if (!userExists)
                return false;

            user = maybeUser.Single();
            return true;
        }
    }
}
