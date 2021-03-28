using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Security;
using Cody.Security.Validation;
using Cody.Services;
using Cody.Services.Email;
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
        private readonly EmailVerificationService _emailValidationService;
        private readonly CodyContext _dbContext;


        public RegistrationController(
            EmailVerificationService emailValidationService,
            CodyContext dbContext
        ) {
            _emailValidationService = emailValidationService;
            _dbContext = dbContext;
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> TryRegisterUser([FromBody] UserRegistrationRequest request)
        {
            var user = request.AsUserAccount();
            var validator = new UserCreationValidator(_dbContext);

            if (validator.Validate(user).WasRejected)
                return validator.StatusCode;

            user.Password =
                await Password.CreateAsync(user.PlainPassword);

            
            try
            {
                _dbContext.UserAccounts.Add(user);
                await _emailValidationService.MarkUserForVerificationAsync(user);
                await _dbContext.SaveChangesAsync();
            }
            catch {
                return Problem();
            }

            await HttpContext.SignInAsync(user);
            return Ok(user.Id);
        }
    }
}
