using Cody.Extensions;
using Cody.Models;
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
            var organizations = GetUserOrganizations()
                .Select(om => om.Organization)
                .OrderBy(o => o.Id)
                .Select(o => new
                {
                    o.Id,
                    o.Name,
                    o.State.HasBeenVerified,
                    Kind = o.Kind.ToString(),
                    HasLogo = o.Detail.Logo != null,
                });

            return Ok(organizations);
        }


        private IQueryable<OrganizationMember> GetUserOrganizations()
        {
            var userId = HttpContext.User.GetId();
            return _dbContext
                .OrganizationMembers
                .Include(om => om.Organization)
                    .ThenInclude(o => o.State)
                .Include(om => om.Organization)
                    .ThenInclude(o => o.Detail)
                        .ThenInclude(d => d.Logo)

                .Where(om => !om.Organization.State.HasBeenDeleted)
                .Where(om => om.UserAccountId == userId);
        }
    }
}
