using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Security;
using Cody.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    [Authorize]
    public class CookieLoginController : ControllerBase
    {
        private readonly ILogger<CookieLoginController> _logger;
        private readonly CodyContext _dbContext;
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;


        public CookieLoginController(
            ILogger<CookieLoginController> logger,
            CodyContext dbContext, 
            PersistentLoginCookieEmitterService cookieEmitter)
        {
            _logger = logger;
            _dbContext = dbContext;
            _cookieEmitter = cookieEmitter;
        }


        [HttpGet("remember_me/{userId}")]
        [Authorize]
        public async Task<IActionResult> TryRememberMe(int userId)
        {
            var user = _dbContext
                .UserAccounts
                .Find(userId);

            if (user is null)
                return NotFound();

            await GenerateUserLoginCookies(user);
            return Ok();
        }


        [HttpGet("login_with_cookie")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithCookie()
        {
            if (!Request.TryGetLoginCookies(out var cookieId, out var token))
                return BadRequest();

            var user =
                await _cookieEmitter.TryLoginAsync(cookieId, token);

            if (user is null)
                return BadRequest();

            await HttpContext.SignInAsync(user);
            await GenerateUserLoginCookies(user);
            return Ok();
        }


        private async Task GenerateUserLoginCookies(UserAccount user)
        {
            var (id, token) =
                await _cookieEmitter.EmitPersistentLoginCookieForAsync(user);

            Response.SetLoginCookies(id, token);
        }
    }
}
