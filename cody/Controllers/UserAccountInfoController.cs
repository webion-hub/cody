using Cody.Contexts;
using Cody.Controllers.Helpers;
using Cody.Extensions;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("user/info")]
    [Authorize]
    public class UserAccountInfoController : ControllerBase
    {
        private readonly ILogger<UserAccountInfoController> _logger;
        private readonly CodyContext _dbContext;


        public UserAccountInfoController(ILogger<UserAccountInfoController> logger, CodyContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] List<string> getters)
        {
            var user = await HttpContext.GetLoggedUserFromAsync(_dbContext);
            var result = getters.ToDictionary(
                prop => prop,
                prop => UserAccountInfoProps.GetPropFor(prop, user)
            );

            return Ok(result);
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] Dictionary<string, string> setters)
        {
            var user = 
                await HttpContext.GetLoggedUserFromAsync(_dbContext);
            
            foreach (var (prop, value) in setters)
            {
                UserAccountInfoProps.SetPropFor(prop, value, user);
            }

            await _dbContext.SaveChangesAsync();
            return Ok(true);
        }
    }
}
