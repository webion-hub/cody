using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedCoursesController
    {
        [HttpPut("add/{courseId}")]
        [Authorize]
        public async Task<IActionResult> Add([FromRoute] int courseId)
        {
            var course = await GetJoinedCourses(courseId);
            if (course is null)
                return NotFound();

            course.IsCourseBookmarked = true;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
