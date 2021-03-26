using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.QueryExtensions;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    [Route("organizations")]
    [ApiController]
    [Authorize]
    public partial class OrganizationsController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationsController(CodyContext context)
        {
            _dbContext = context;
        }


        public async Task<IQueryable<Organization>> GetOrganizationsBasedOnUserRoleAync()
        {
            var organizations = _dbContext.GetAllOrganizations();
            var isUserAdmin =
                await HttpContext.IsUserInRoleAsync(Roles.Admin);

            return isUserAdmin
                ? organizations
                : organizations
                    .ThatArePublic() 
                    .ThatHaveNotBeenDeleted();
        }

        private async Task<Organization> GetOrganizationByIdAsync(int id)
        {
            return await _dbContext
                .Organizations
                .IncludingState()
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        private IQueryable<object> FormatAsResponse(IQueryable<Organization> self)
        {
            var userId = HttpContext.User.MaybeGetId();
            return
                from o in self
                let s = o.State
                let d = o.Detail
                let m = o.Members
                let l = d.Logo
                let b = d.Cover

                orderby o.Id ascending
                select new
                {
                    o.Id,
                    o.Name,
                    State = new
                    {
                        s.HasBeenVerified,
                        s.HasBeenDeleted,
                        Visibility = s.Visibility.ToString(),
                        AccessCriteria = s.AccessCriteria.ToString(),
                    },
                    Kind = o.Kind.ToString(),
                    Detail = new
                    {
                        d.Location,
                        d.Description,
                        d.Website,
                    },
                    MembersCount = m.Count,
                    HasLogo = l != null,
                    HasCover = b != null,

                    IsCallerAMember = 
                        userId != null && m.Any(m => m.UserAccountId == userId)
                };
        }
    }
}
