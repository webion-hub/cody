using Cody.Controllers.Responses;
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
        public IActionResult GetOrganization(int id)
        {
            var organization = GetAllOrganizations()
                .Where(o => o.Id == id)
                .AsResponse()
                .FirstOrDefault();

            return organization is null
                ? NotFound()
                : Ok(organization);
        }
    }
}
