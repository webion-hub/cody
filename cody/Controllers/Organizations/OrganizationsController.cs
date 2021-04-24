using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Models.Organizations;
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
    [Route("api/organizations")]
    [ApiController]
    [Authorize]
    public partial class OrganizationsController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationsController(CodyContext context)
        {
            _dbContext = context;
        }
    }
}
