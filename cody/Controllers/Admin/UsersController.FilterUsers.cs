using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    public partial class UsersController : ControllerBase
    {
        [HttpPost("filter")]
        [Authorize]
        public async Task<IActionResult> FilterUsers([FromBody] List<string> filters)
        {
            var users = await GetUsers()
                .ToListAsync();

            return Ok(users);
        }
    }
}
