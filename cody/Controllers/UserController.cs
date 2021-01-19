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
        private readonly CodyContext _context;
        private readonly UserLoginCookieEmitter _cookieEmitter;

        public UserController(
            ILogger<UserController> logger,
            EmailValidationService emailValidationService,
            CodyContext context,
            UserLoginCookieEmitter cookieEmitter
        ) {
            _logger = logger;
            _emailValidationService = emailValidationService;
            _context = context;
            _cookieEmitter = cookieEmitter;
        }


        [HttpGet]
        [Route("exists/{usernameOrEmail}")]
        public IActionResult UserExists(string usernameOrEmail)
        {
            var exists =
                _context.UserExists(usernameOrEmail);

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
                _context.MaybeGetUserBy(username);

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


        [HttpGet]
        [Route("remember_me/{userId}")]
        public async Task<IActionResult> TryRememberMe(int userId)
        {
            var user = _context
                .UserAccounts
                .Find(userId);

            if (user is null)
                return NotFound();

            await GenerateUserLoginCookies(user);
            return Ok();
        }


        [HttpGet]
        [Route("login_with_cookie")]
        public async Task<IActionResult> LoginWithCookie() 
        {
            var cookieIdString = Request.Cookies["login_cookie_id"];
            var cookie = Request.Cookies["login_cookie"];

            if (!int.TryParse(cookieIdString, out var cookieId))
                return BadRequest();

            if (string.IsNullOrWhiteSpace(cookie))
                return BadRequest();


            var maybeUser =
                await _cookieEmitter.TryLoginAsync(cookieId, cookie);

            if (maybeUser is null)
                return BadRequest();


            await GenerateUserLoginCookies(maybeUser);
            return Ok();
        }


        public async Task GenerateUserLoginCookies(UserAccount user)
        {
            var (cookieId, cookie) =
                await _cookieEmitter.EmitPersistentLoginCookieForAsync(user);

            Response.Cookies.Append("login_cookie_id", cookieId.ToString());
            Response.Cookies.Append("login_cookie", cookie);
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
                await _context.UserAccounts.AddAsync(account);
                await _context.SaveChangesAsync();
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
            if (_context.UserExists(username))
                yield return "username_exists";

            else if (_context.UserExists(email))
                yield return "email_exists";
        }
    }
}
