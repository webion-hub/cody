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
        [HttpPost("create/course")]
        [Authorize]
        public async Task<IActionResult> CreateCourse(
            [FromBody] CourseCreationRequest request
        ) {
            var userId = HttpContext.User.GetId();
            var isAdmin = await _dbContext
                .OrganizationMembers
                .IsAdminOfAsync(userId, request.OrganizationId);

            if (!isAdmin) {
                return Unauthorized();
            }

            var course = request.AsCourse();
            _dbContext.Courses.Add(course);
            await _dbContext.SaveChangesAsync();
            
            return Created(
                uri: $"organization/{course.OrganizationId}/course/{course.Id}", 
                value: course.Id
            );
        }
    }
}
