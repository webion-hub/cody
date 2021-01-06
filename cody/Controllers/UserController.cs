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

namespace cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly CodyContext _context;

        public UserController(CodyContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("exists/{usernameOrEmail}")]
        public IActionResult UserExists(string usernameOrEmail)
        {
            return _context.UserExists(usernameOrEmail)
                ? Ok()
                : NotFound();
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

            if (!isPasswordCorrect)
                return BadRequest();

            return Ok();
        }


        /// <response code="200">The registration was successfull</response>
        /// <response code="400">Registration error, along with the reject reasons</response>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> TryRegisterUser([FromBody] UserAccount account)
        {
            account.TrimSelfAndRelated();

            var rejectReasons = MaybeReject(account);
            if (rejectReasons.Any())
                return BadRequest(rejectReasons);

            try
            {
                await _context.UsersAccounts.AddAsync(account);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException) {
                return BadRequest(new []{ "server_error" });
            }

            return Ok();
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
