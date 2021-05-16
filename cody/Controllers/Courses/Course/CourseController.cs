using Cody.Contexts;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
