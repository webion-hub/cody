using Cody.Contexts;
using Cody.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("user")]
    [ApiController]
    [Authorize]
    public class LogoutController : ControllerBase
    {
        private readonly ILogger<LogoutController> _logger;
        private readonly CodyContext _dbContext;

        public LogoutController(ILogger<LogoutController> logger, CodyContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync();

            if (!Request.TryGetLoginCookies(out var id, out var _))
                return Ok();

            var cookie = _dbContext
                .LoginCookies
                .Find(id);

            _dbContext.LoginCookies.Remove(cookie);
            await _dbContext.SaveChangesAsync();

            Response.DeleteLoginCookies();
            return Ok();
        }
    }
}
