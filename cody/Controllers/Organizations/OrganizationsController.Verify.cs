﻿using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsController
    {
        [HttpPatch("verify/{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Verify(int id)
        {
            var organization = await GetOrganizationByIdAsync(id);
            if (organization is null)
                return NotFound();

            organization.State.HasBeenVerified = true;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
