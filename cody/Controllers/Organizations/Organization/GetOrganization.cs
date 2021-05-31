using Cody.Extensions;
using Cody.Db.Extensions;
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
        public async Task<IActionResult> GetOrganization(int organizationId)
        {
            var user = await HttpContext.GetLoggedUserAsync();
            var result = await _dbContext
                .GetAllOrganizations()
                .Where(o => o.Id == organizationId)
                .FormatFor(user)
                .FirstOrDefaultAsync();

            return result is null
                ? NotFound()
                : Ok(result);
        }
    }
}
