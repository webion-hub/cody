using Cody.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers.Organizations
{
    [Route("api/organizations/courses")]
    [ApiController]
    [Authorize]
    public partial class OrganizationsCoursesController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationsCoursesController(CodyContext context)
        {
            _dbContext = context;
        }
    }
}
