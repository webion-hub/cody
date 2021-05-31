using Cody.Db;
using Cody.Controllers.Requests;
using Cody.Security.Extensions;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using Cody.Security;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cody.Db.Bags;

namespace Cody.Controllers
{
    [ApiController]
    [Route("api/user")]
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

            await HttpContext.SignInAsync(user, new RefreshTokensBag(_dbContext));
            if (request.RememberMe is true)
                await _cookieEmitter.EmitAndAttachToResponseAsync(user, Response);

            return Ok();
        }


        private async Task<UserAccount> MaybeGetUserAsync(string usernameOrEmail)
        {
            return await _dbContext
                .UserAccounts
                .IncludingPassword().WithMetadata()
                .GetBy(usernameOrEmail)
                .SingleOrDefaultAsync();
        }
    }
}
