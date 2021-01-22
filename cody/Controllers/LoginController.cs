using Cody.Contexts;
using Cody.Extensions;
using Cody.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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

        public LoginController(ILogger<LoginController> logger, CodyContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }


        /// <response code="200">The login was successfull</response>
        /// <response code="404">The username wasn't found</response>
        /// <response code="400">The passwords didn't match</response>
        [HttpGet]
        [Route("login/{username}/{password}")]
        public async Task<IActionResult> TryLoginAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username))
                return NotFound();

            if (string.IsNullOrWhiteSpace(password))
                return BadRequest();


            var maybeUser =
                _dbContext.MaybeGetUserBy(username);

            var userExists = maybeUser.Any();
            if (!userExists)
                return NotFound();

            var foundUser = maybeUser.Single();
            var isPasswordCorrect =
                Password.AreEqual(password, foundUser.Password);

            if (!isPasswordCorrect)
            {
                _logger.LogWarning($"User {username} -> incorrect password");
                return BadRequest();
            }

            await HttpContext.UserSignInAsync(foundUser);
            _logger.LogInformation($"User {username} -> logged in");
            return Ok();
        }
    }
}
