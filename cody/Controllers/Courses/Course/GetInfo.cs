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
    public partial class CourseController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetInfo(int organizationId, int courseId)
        {
            var course = await _dbContext
                .Organizations
                .ThatArePublic()
                .ThatHaveNotBeenDeleted()
                .Include(o => o.Courses)
                .SelectMany(o => o.Courses)
                .Where(c => 
                    c.Id == courseId &&
                    c.OrganizationId == organizationId
                )
                .Format()
                .FirstOrDefaultAsync();

            return Ok(course);
        }
    }
}
