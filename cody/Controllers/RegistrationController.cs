using Cody.Contexts;
using Cody.Models;
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
        public async Task<IActionResult> TryRegisterUser([FromBody] UserAccount account)
        {
            account.TrimSelfAndRelated();

            var rejectReasons = MaybeReject(account);
            if (rejectReasons.Any())
            {
                _logger.LogInformation("User registration rejected - {Account}|{RejectReasons}", account, rejectReasons);
                return BadRequest(rejectReasons);
            }

            try
            {
                await _emailValidationService.MarkUserForValidationAsync(account);
                await _dbContext.UserAccounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                _logger.LogError(e, "DB Register error - {Account}", account);
                return BadRequest(new[] { "server_error" });
            }

            _logger.LogInformation("Registered user -> {Account}", account);
            return Ok(account.AccountDetail.Id);
        }


        private List<string> MaybeReject(UserAccount account)
        {
            var rejectReasons = new List<string>();
            rejectReasons.AddRange(account.GetRejectReasons());
            rejectReasons.AddRange(account.AccountDetail?.GetRejectReasons());

            if (!rejectReasons.Any())
            {
                rejectReasons.AddRange(
                    MaybeUserExists(account.Username, account.Email));
            }

            return rejectReasons;
        }

        private IEnumerable<string> MaybeUserExists(string username, string email)
        {
            if (_dbContext.UserExists(username))
                yield return "username_exists";

            else if (_dbContext.UserExists(email))
                yield return "email_exists";
        }
    }
}
