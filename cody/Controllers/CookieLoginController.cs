using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class CookieLoginController : ControllerBase
    {
        private readonly ILogger<CookieLoginController> _logger;
        private readonly CodyContext _dbContext;
        private readonly PersistentLoginCookieEmitterService _cookieEmitter;


        private struct Cookies
        {
            public const string ID = "login_cookie_id";
            public const string TOKEN = "login_cookie_token";
        }


        public CookieLoginController(
            ILogger<CookieLoginController> logger,
            CodyContext dbContext, 
            PersistentLoginCookieEmitterService cookieEmitter)
        {
            _logger = logger;
            _dbContext = dbContext;
            _cookieEmitter = cookieEmitter;
        }


        [HttpGet]
        [Route("remember_me/{userId}")]
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


        [HttpGet]
        [Route("login_with_cookie")]
        public async Task<IActionResult> LoginWithCookie()
        {
            if (!TryGetLoginCookies(out var cookieId, out var token))
                return BadRequest();

            var maybeUser =
                await _cookieEmitter.TryLoginAsync(cookieId, token);

            if (maybeUser is null)
                return BadRequest();

            await HttpContext.UserSignInAsync(maybeUser);
            await GenerateUserLoginCookies(maybeUser);
            return Ok();
        }


        private bool TryGetLoginCookies(out int cookieId, out string token)
        {
            var cookieIdString = Request.Cookies[Cookies.ID];
            token = Request.Cookies[Cookies.TOKEN];

            if (!int.TryParse(cookieIdString, out cookieId))
                return false;

            if (string.IsNullOrWhiteSpace(token))
                return false;

            return true;
        }


        private async Task GenerateUserLoginCookies(UserAccount user)
        {
            var (id, token) =
                await _cookieEmitter.EmitPersistentLoginCookieForAsync(user);

            Response.Cookies.Append(Cookies.ID, id.ToString());
            Response.Cookies.Append(Cookies.TOKEN, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
        }
    }
}
