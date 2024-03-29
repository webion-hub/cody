﻿using Cody.Db;
using Cody.Db.Models.Organizations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cody.Security.Extensions;

namespace Cody.Controllers
{
    [Route("api/user/bookmarks/organizations")]
    [Authorize]
    [ApiController]
    public partial class BookmarkedOrganizationsController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public BookmarkedOrganizationsController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<OrganizationMember> GetJoinedOrganization(int organizationId)
        {
            var userId = HttpContext.User.GetId();
            return await _dbContext
                .OrganizationMembers
                .FirstOrDefaultAsync(om =>
                    om.UserAccountId == userId &&
                    om.OrganizationId == organizationId
                );
        }
    }
}
