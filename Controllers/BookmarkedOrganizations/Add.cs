using Cody.Extensions;
using Cody.Db.Models.Organizations;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedOrganizationsController
    {
        [HttpPut("add/{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Add([FromRoute] int organizationId)
        {
            var organization = await GetJoinedOrganization(organizationId);
            if (organization is null)
                return NotFound();

            organization.IsBookmarked = true;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
