using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class CookieLoginController : ControllerBase
    {
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;


        public CookieLoginController(PersistentLoginCookieEmitterService cookieEmitter) 
        {
            _cookieEmitter = cookieEmitter;
        }


        [HttpPost("login_with_cookie")]
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
            await _cookieEmitter.EmitAndAttachToResponseAsync(user, Response);
            return Ok();
        }
    }
}
