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
                return NotFound("The user does not exist");

            var foundUser = maybeUser.First();
            var isPasswordCorrect = 
                Password.AreEqual(password, foundUser.Password);

            if (!isPasswordCorrect)
                return BadRequest("The password is incorrect");

            return Ok();
        }
    }
}
