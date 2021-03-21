using Cody.Contexts;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("user/validate")]
    [AllowAnonymous]
    [ApiController]
    public class EmailValidationController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public EmailValidationController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("{userId}/{validationKey}")]
        [AllowAnonymous]
        public async Task<IActionResult> Validate(
            [FromRoute] int userId,
            [FromRoute] Guid validationKey
        ) {
            var user = await GetUserAsync(userId);
            if (user is null)
                return Redirect("/validate-email#not-found");

            if (user.AccountState.ValidationKey != validationKey)
                return Redirect("/validate-email#bad-key");

            user.AccountState.ValidationKey = default;
            user.AccountState.IsEmailValid = true;
            await _dbContext.SaveChangesAsync();
            return Redirect("/validate-email#ok");
        }


        private async Task<UserAccount> GetUserAsync(int userId)
        {
            return await _dbContext
                .UserAccounts
                .Include(u => u.AccountState)
                .SingleOrDefaultAsync(u => u.Id == userId);
        }
    }
}
