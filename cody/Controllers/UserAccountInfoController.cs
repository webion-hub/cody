using Cody.Db;
using Cody.Controllers.Helpers;
using Cody.Extensions;
using Cody.Db.Extensions;
using Cody.Security.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("api/user/info")]
    [Authorize]
    public class UserAccountInfoController : ControllerBase
    {
        private readonly CodyContext _dbContext;


        public UserAccountInfoController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] List<string> getters)
        {
            var user = await HttpContext.GetLoggedUserAsync(
                user => user.IncludingBiography()
            );

            var userProps = new UserAccountInfoProps(_dbContext, user);
            var result = getters.ToDictionary(
                prop => prop,
                prop => userProps.Get(prop)
            );

            return Ok(result);
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] Dictionary<string, object> setters)
        {
            var user = await HttpContext.GetLoggedUserAsync(
                user => user.IncludingBiography()
            );

            var userProps = new UserAccountInfoProps(_dbContext, user);
            var validator = new UserUpdateValidator(_dbContext);

            try {
                foreach (var (prop, value) in setters)
                    userProps.Set(prop, value);
            }
            catch {
                return BadRequest();
            }

            if (validator.Validate(user).WasRejected)
                return validator.StatusCode;

            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
