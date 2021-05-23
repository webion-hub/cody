using Cody.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers.Organizations
{
    [Route("api/organization/{organizationId}/courses")]
    [ApiController]
    [Authorize]
    public partial class OrganizationCoursesController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public OrganizationCoursesController(CodyContext context)
        {
            _dbContext = context;
        }
    }
}
