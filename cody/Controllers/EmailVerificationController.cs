using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.QueryExtensions;
using Cody.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("user/verify")]
    [AllowAnonymous]
    [ApiController]
    public class EmailVerificationController : ControllerBase
    {
        private readonly EmailVerificationService _emailVerificationService;
        private readonly CodyContext _dbContext;

        public EmailVerificationController(
            EmailVerificationService emailValidationService,
            CodyContext dbContext
        ) {
            _emailVerificationService = emailValidationService;
            _dbContext = dbContext;
        }


        [HttpGet("send_new_verification_email")]
        [Authorize]
        public async Task<IActionResult> SendNew()
        {
            var user = await HttpContext.GetLoggedUserAsync();
            if (user is null)
                return BadRequest();

            await _emailVerificationService.MarkUserForVerificationAsync(user);
            return Ok();
        }


        [HttpGet("{userId}/{verificationKey}")]
        [AllowAnonymous]
        public async Task<IActionResult> Validate(
            [FromRoute] int userId,
            [FromRoute] Guid verificationKey
        ) {
            var user = await GetUserAsync(userId);
            if (user is null)
                return Redirect("/email-verification#not-found");
            
            if (user.AccountState.VerificationKey != verificationKey)
                return Redirect("/email-verification#bad-key");

            user.AccountState.VerificationKey = default;
            user.AccountState.IsEmailVerified = true;
            await _dbContext.SaveChangesAsync();
            return Redirect("/email-verification#ok");
        }


        private async Task<UserAccount> GetUserAsync(int userId)
        {
            return await _dbContext
                .UserAccounts
                .IncludingState()
                .SingleOrDefaultAsync(u => u.Id == userId);
        }
    }
}
