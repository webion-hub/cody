using Cody.Db;
using Cody.Db.Models.Organizations;
using Cody.Db.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cody.Security.Extensions;

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
