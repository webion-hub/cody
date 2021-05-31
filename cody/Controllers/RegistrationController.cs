using Cody.Db;
using Cody.Controllers.Requests;
using Cody.Security.Extensions;
using Cody.Security;
using Cody.Security.Validation;
using Cody.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Cody.Db.Models.Users;
using Cody.Db.Bags;

namespace Cody.Controllers
{
    [ApiController]
    [Route("api/user")]
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
                await Password.CreateAsync(user.PlainPassword) as UserAccountPassword;

            
            try
            {
                _dbContext.UserAccounts.Add(user);
                await _emailValidationService.MarkUserForVerificationAsync(user);
                await _dbContext.SaveChangesAsync();
            }
            catch {
                return Problem();
            }

            await HttpContext.SignInAsync(user, new RefreshTokensBag(_dbContext));
            return Ok(user.Id);
        }
    }
}
