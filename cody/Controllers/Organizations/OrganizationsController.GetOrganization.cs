using Cody.Controllers.Responses;
using Cody.Extensions;
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
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetOrganization(int id)
        {
            var organizations = await GetOrganizationsBasedOnUserRoleAync();
            var organization = organizations
                .Where(o => o.Id == id)
                .AsGetOrganizationResponse()
                .FirstOrDefault();

            return organization is null
                ? NotFound()
                : Ok(organization);
        }
    }
}
