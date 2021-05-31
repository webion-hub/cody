using Cody.Db;
using Cody.Db.Bags;
using Cody.Security.Extensions;
using Cody.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class CookieLoginController : ControllerBase
    {
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;
        private readonly CodyContext _dbContext;


        public CookieLoginController(
            PersistentLoginCookieEmitterService cookieEmitter,
            CodyContext dbContext
        ) {
            _cookieEmitter = cookieEmitter;
            _dbContext = dbContext;
        }


        [HttpPost("login_with_cookie")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithCookie()
        {
            if (!Request.TryGetLoginCookies(out var cookieId, out var token))
                return NoContent();

            var user =
                await _cookieEmitter.TryLoginAsync(cookieId, token);

            if (user is null)
                return BadRequest();

            await HttpContext.SignInAsync(user, new RefreshTokensBag(_dbContext));
            await _cookieEmitter.EmitAndAttachToResponseAsync(user, Response);
            return Ok();
        }
    }
}
