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
        [Route("login")]
        public IActionResult TryLoginAsync([FromQuery] User inUser)
        {
            var maybeUser =
                from user in _context.Users
                where
                    user.Email == inUser.Email &&
                    Password.AreEqual(inUser.Password, user.Password)
                select user;

            var userExists = maybeUser.Any();
            if (userExists)
                return Ok();

            return ValidationProblem();
        }
    }
}
