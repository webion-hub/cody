using Cody.Extensions;
using Cody.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedOrganizationsController
    {
        [HttpPut("organizations/add/{organizationId}")]
        [Authorize]
        public async Task<IActionResult> Add([FromRoute] int organizationId)
        {
            var organizationExists = await OrganizationExistsAsync(organizationId);
            if (!organizationExists)
                return NotFound();

            var userId = HttpContext.User.GetId();
            var bookmark = new BookmarkedOrganization {
                UserAccountId = userId,
                OrganizationId = organizationId,
            };

            var bookmarkExists = await BookmarkedOrganizationExistsAsync(bookmark);
            if (bookmarkExists)
                return Ok();

            _dbContext.BookmarkedOrganizations.Add(bookmark);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        public async Task<bool> OrganizationExistsAsync(int organizationId)
        {
            var organization = await _dbContext
                .Organizations
                .FirstOrDefaultAsync(o => o.Id == organizationId);

            return organization is not null;
        }

        public async Task<bool> BookmarkedOrganizationExistsAsync(BookmarkedOrganization bookmark)
        {
            return await _dbContext
                .BookmarkedOrganizations
                .ContainsAsync(bookmark);
        }
    }
}
