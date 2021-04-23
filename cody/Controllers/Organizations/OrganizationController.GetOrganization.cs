using Cody.Extensions;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetOrganization(int id)
        {
            var user = await HttpContext.GetLoggedUserAsync();
            var result = await _dbContext
                .GetAllOrganizations()
                .Where(o => o.Id == id)
                .FormatFor(user)
                .FirstOrDefaultAsync();

            return result is null
                ? NotFound()
                : Ok(result);
        }
    }
}
