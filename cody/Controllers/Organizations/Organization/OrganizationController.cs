using Cody.Contexts;
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
    [Route("api/organization/{organizationId}")]
    [ApiController]
    [Authorize]
    public partial class OrganizationController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationController(CodyContext context)
        {
            _dbContext = context;
        }


        private async Task<Organization> GetOrganizationByIdAsync(int id)
        {
            return await _dbContext
                .Organizations
                .IncludingState()
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
