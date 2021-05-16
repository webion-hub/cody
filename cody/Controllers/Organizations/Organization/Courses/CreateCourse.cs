using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationController
    {
        [HttpPost("courses/create")]
        [Authorize]
        public async Task<IActionResult> CreateCourse(
            [FromBody] CourseCreationRequest request
        ) {
            var course = request.AsCourse();
            var userId = HttpContext.User.GetId();
            var isAdmin = await _dbContext
                .OrganizationMembers
                .IsAdminOfAsync(userId, course.OrganizationId);

            if (!isAdmin)
                return Unauthorized();

            var isDuplicate = await IsDuplicateAsync(course);
            if (isDuplicate)
                return BadRequest();

            _dbContext.Courses.Add(course);
            await _dbContext.SaveChangesAsync();

            return Created(
                uri: $"organization/{course.OrganizationId}/course/{course.Id}", 
                value: course.Id
            );
        }
    }
}
