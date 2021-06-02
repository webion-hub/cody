using Cody.Db;
using Cody.Extensions;
using Cody.Security.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class LogoutController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public LogoutController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync();
            await MaybeDeleteCookiesAsync();
            return Ok();
        }


        private async Task MaybeDeleteCookiesAsync()
        {
            if (!Request.TryGetLoginCookies(out var id, out var _))
                return;

            var cookie = await _dbContext
                .LoginCookies
                .FindAsync(id);

            if (cookie is null)
                return;

            _dbContext.LoginCookies.Remove(cookie);
            await _dbContext.SaveChangesAsync();

            Response.DeleteLoginCookies();
        }
    }
}
