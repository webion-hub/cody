using Cody.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedOrganizationsController
    {
        [HttpDelete("remove/{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Remove([FromRoute] int organizationId)
        {
            var userId = HttpContext.User.GetId();
            var organization = await _dbContext
                .BookmarkedOrganizations
                .FindAsync(userId, organizationId);

            if (organization is null)
                return NotFound();

            _dbContext.BookmarkedOrganizations.Remove(organization);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
