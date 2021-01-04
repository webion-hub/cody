using cody.Contexts;
using cody.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly CodyContext _context;

        public UserController(CodyContext context)
        {
            _context = context;
        }


        /// <response code="200">The login was successfull</response>
        /// <response code="404">The username wasn't found</response>
        /// <response code="400">The passwords didn't match</response>
        [HttpGet]
        [Route("login/{username}/{password}")]
        public IActionResult TryLoginAsync(string username, string password)
        {
            var maybeUser =
                from user in _context.UsersAccounts
                where user.Username == username
                select user;

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
            var rejectReasons = new List<string>();
            rejectReasons.AddRange(
                MaybeGetAccountRejectReasons(account));

            if (rejectReasons.Any())
                return BadRequest(rejectReasons);

            await _context.UsersAccounts.AddAsync(account);
            await _context.SaveChangesAsync();
            return Ok();
        }


        private static IEnumerable<string> MaybeGetAccountRejectReasons(UserAccount account)
        {
            if (account.Password.Length is < 6 or > 16)
                yield return "password";

            if (account.Username.Length is < 4 or > 28)
                yield return "username";
        }
    }
}
