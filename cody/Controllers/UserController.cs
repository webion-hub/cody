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


        /// <returns>
        /// <see cref="StatusCodes.Status200OK"/> if the login was successfull <br/>
        /// <see cref="StatusCodes.Status404NotFound"/> if the username wasn't found <br/>
        /// <see cref="StatusCodes.Status400BadRequest"/> if the passwords didn't match
        /// </returns>
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


        /// <returns>
        /// <see cref="StatusCodes.Status200OK"/> if the registration was successfull <br/>
        /// <see cref="StatusCodes.Status400BadRequest"/> along with the reject reasons <br/>
        /// </returns>
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


        private IEnumerable<string> MaybeGetAccountRejectReasons(UserAccount account)
        {
            if (account.Password.Length is < 6 or > 16)
                yield return "password";

            if (account.Username.Length is < 4 or > 28)
                yield return "username";

            yield break;
        }
    }
}
