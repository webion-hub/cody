using Cody.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class UserController
    {
        [HttpGet("joined_organizations")]
        [Authorize]
        public IActionResult GetJoinedOrganizations()
        {
            var userId = HttpContext.User.GetId();
            var organizations = _dbContext
                .OrganizationMembers
                .Include(om => om.Organization)
                    .ThenInclude(o => o.State)
                .Where(om => !om.Organization.State.HasBeenDeleted)
                .Where(om => om.UserAccountId == userId)
                .Select(om => new
                {
                    om.Organization.Id,
                    om.Organization.Name,
                    om.Organization.State.HasBeenVerified,
                    Kind = om.Organization.Kind.ToString(),
                });

            return Ok(organizations);
        }
    }
}
