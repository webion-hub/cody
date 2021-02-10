using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Security;
using Cody.Security.Validation;
using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class RegistrationController : ControllerBase
    {
        private readonly ILogger<RegistrationController> _logger;
        private readonly EmailValidationService _emailValidationService;
        private readonly CodyContext _dbContext;


        public RegistrationController(
            ILogger<RegistrationController> logger,
            EmailValidationService emailValidationService,
            CodyContext dbContext
        ) {
            _logger = logger;
            _emailValidationService = emailValidationService;
            _dbContext = dbContext;
        }


        /// <response code="200">Returns the id of the new user</response>
        /// <response code="400">Registration error, along with the reject reasons</response>
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> TryRegisterUser([FromBody] UserRegistrationRequest request)
        {
            UserAccount user = request;

            var validator = new UserCreationValidator(_dbContext);
            if (validator.Validate(user).WasRejected)
                return validator.StatusCode;

            try
            {
                await _emailValidationService.MarkUserForValidationAsync(user);
                await _dbContext.UserAccounts.AddAsync(user);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                _logger.LogError(e, "DB Register error - {Account}", user);
                return BadRequest(new[] { "server_error" });
            }

            await HttpContext.SignInAsync(user);
            return Ok(user.Id);
        }
    }
}
