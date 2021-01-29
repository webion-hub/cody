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

namespace Cody.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly CodyContext _dbContext;

        public UserController(ILogger<UserController> logger, CodyContext dbContext) 
        {
            _logger = logger;
            _dbContext = dbContext;
        }


        [HttpGet("exists/{usernameOrEmail}")]
        [AllowAnonymous]
        public IActionResult UserExists(string usernameOrEmail)
        {
            var exists =
                _dbContext.UserExists(usernameOrEmail);

            _logger.LogInformation($"UserExists - {usernameOrEmail} -> {exists}");
            return Ok(exists);
        }
    }
}
