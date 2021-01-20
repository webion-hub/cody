using cody.Contexts;
using cody.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using cody.Services;
using cody.Security;

namespace cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly EmailValidationService _emailValidationService;
        private readonly CodyContext _dbContext;

        public UserController(
            ILogger<UserController> logger,
            EmailValidationService emailValidationService,
            CodyContext dbContext
        ) {
            _logger = logger;
            _emailValidationService = emailValidationService;
            _dbContext = dbContext;
        }


        [HttpGet]
        [Route("exists/{usernameOrEmail}")]
        public IActionResult UserExists(string usernameOrEmail)
        {
            var exists =
                _dbContext.UserExists(usernameOrEmail);

            _logger.LogInformation($"UserExists - {usernameOrEmail} -> {exists}");
            return Ok(exists);
        }


        /// <response code="200">The login was successfull</response>
        /// <response code="404">The username wasn't found</response>
        /// <response code="400">The passwords didn't match</response>
        [HttpGet]
        [Route("login/{username}/{password}")]
        public IActionResult TryLogin(string username, string password)
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

            var foundUser = maybeUser.First();
            var isPasswordCorrect =
                Password.AreEqual(password, foundUser.Password);

            if (!isPasswordCorrect) {
                _logger.LogWarning($"User {username} -> incorrect password");
                return BadRequest();
            }

            _logger.LogInformation($"User {username} -> logged in");
            return Ok();
        }


        /// <response code="200">Returns the id of the new user</response>
        /// <response code="400">Registration error, along with the reject reasons</response>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> TryRegisterUser([FromBody] UserAccount account)
        {
            account.TrimSelfAndRelated();

            var rejectReasons = MaybeReject(account);
            if (rejectReasons.Any()) {
                _logger.LogInformation("User registration rejected - {Account}|{RejectReasons}", account, rejectReasons);
                return BadRequest(rejectReasons);
            }

            try
            {
                await _emailValidationService.MarkUserForValidationAsync(account);
                await _dbContext.UserAccounts.AddAsync(account);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException e) {
                _logger.LogError(e, "DB Register error - {Account}", account);
                return BadRequest(new []{ "server_error" });
            }

            _logger.LogInformation("Registered user -> {Account}", account);
            return Ok(account.AccountDetail.Id);
        }


        private List<string> MaybeReject(UserAccount account)
        {
            var rejectReasons = new List<string>();
            rejectReasons.AddRange(account.GetRejectReasons());
            rejectReasons.AddRange(account.AccountDetail?.GetRejectReasons());

            if (!rejectReasons.Any()) {
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
