using Cody.Contexts;
using Cody.Models;
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
using Cody.Services;
using Cody.Security;
using Microsoft.AspNetCore.Authorization;
using Cody.Extensions;

namespace Cody.Controllers
{
    [ApiController]
    [Authorize]
    [Route("user")]
    public partial class UserController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public UserController(CodyContext dbContext) 
        {
            _dbContext = dbContext;
        }


        [HttpGet("is_logged")]
        [AllowAnonymous]
        public IActionResult IsUserLogged()
        {
            return Ok(HttpContext.User.Identity.IsAuthenticated);
        }


        [HttpGet("exists/{usernameOrEmail}")]
        [AllowAnonymous]
        public IActionResult UserExists(string usernameOrEmail)
        {
            var exists =
                _dbContext.UserExists(usernameOrEmail);

            return Ok(exists);
        }
    }
}
