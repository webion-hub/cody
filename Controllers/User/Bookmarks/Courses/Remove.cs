using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class BookmarkedCoursesController
    {
        [HttpDelete("remove/{courseId}")]
        [Authorize]
        public async Task<IActionResult> Remove([FromRoute] int courseId)
        {
            var course = await GetJoinedCourses(courseId);
            if (course is null)
                return NotFound();

            course.IsCourseBookmarked = false;
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
