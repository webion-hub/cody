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
            var organization = await GetJoinedOrganization(organizationId);
            if (organization is null)
                return NotFound();

            organization.IsBookmarked = false;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
