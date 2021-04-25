using Cody.Contexts;
using Cody.Extensions;
using Cody.Models.Organizations;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    [Route("api/organization/{organizationId}/user/{userId}")]
    [ApiController]
    [Authorize]
    public partial class OrganizationUserController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationUserController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        private async Task<bool> IsCallerAdminOfAsync(int organizationId)
        {
            var callerId = HttpContext.User.GetId();
            return await _dbContext
                .OrganizationMembers
                .IsAdminOfAsync(callerId, organizationId);
        }

        private async Task<OrganizationMember> GetMemberOfAsync(int memberId, int organizationId)
        {
            return await _dbContext
                .OrganizationMembers
                .FirstOrDefaultAsync(om =>
                    om.OrganizationId == organizationId &&
                    om.UserAccountId == memberId
                );
        }
    }
}
