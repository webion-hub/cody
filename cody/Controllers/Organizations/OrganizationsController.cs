using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
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
        private readonly ILogger<OrganizationsController> _logger;
        private readonly CodyContext _dbContext;

        public OrganizationsController(ILogger<OrganizationsController> logger, CodyContext context)
        {
            _logger = logger;
            _dbContext = context;
        }


        public async Task<IQueryable<Organization>> GetOrganizationsBasedOnUserRoleAync()
        {
            var organizations = _dbContext.GetAllOrganizations();
            var isUserAdmin =
                await HttpContext.IsUserInRoleAsync(Roles.Admin);

            return isUserAdmin
                ? organizations
                : organizations.Where(o => !o.State.HasBeenDeleted);
        }

        private async Task<Organization> GetOrganizationByIdAsync(int id)
        {
            return await _dbContext
                .Organizations
                .Include(o => o.State)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
