using Cody.Db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
