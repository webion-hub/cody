using Cody.Db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers.Courses.Course
{
    [Authorize]
    [ApiController]
    [Route("api/organization/{organizationId}/course/{courseId}")]
    public partial class CourseController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public CourseController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
