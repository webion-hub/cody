using Cody.Models;
using Cody.Security.Authorization;
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
        [HttpDelete()]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Delete(int id) => await DeleteOrRestoreAsync(id, isDeleted: true);

        [HttpPatch("restore")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Restore(int id) => await DeleteOrRestoreAsync(id, isDeleted: false);


        private async Task<IActionResult> DeleteOrRestoreAsync(int organizationId, bool isDeleted)
        {
            var organization = await GetOrganizationByIdAsync(organizationId);
            if (organization is null)
                return NotFound();

            organization.State.HasBeenDeleted = isDeleted;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
