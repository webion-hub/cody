using Cody.Controllers.Requests;
using Cody.Db.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Cody.Security.Extensions;

namespace Cody.Controllers.Courses.Course
{
    public partial class CourseController : ControllerBase
    {
        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(
            [FromRoute] int organizationId,
            [FromRoute] int courseId,
            [FromBody] CourseUpdateRequest request
        ) {
            var userId = HttpContext.User.GetId();
            var course = await _dbContext
                .Courses
                .FindAsync(courseId);

            var isUserATeacher = await course
                .Members
                .AsQueryable()
                .ThatAreTeachers()
                .ThatHaveUserId(userId)
                .AnyAsync();

            if (!isUserATeacher)
                return Unauthorized();

            course.Title = request.Title;
            course.Description = request.Description;
            return Ok();
        }
    }
}
