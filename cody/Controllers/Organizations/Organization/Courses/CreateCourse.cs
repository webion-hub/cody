using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.QueryExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationCoursesController
    {
        [HttpPost("create")]
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

            var isDuplicate = await ExistsAsync(course);
            if (isDuplicate)
                return BadRequest("duplicate");

            var areAllMembers = await AreAllTeachersMembersAsync(request);
            if (!areAllMembers)
                return BadRequest("teachers_not_all_members");

            _dbContext.Courses.Add(course);
            await _dbContext.SaveChangesAsync();
            return Created(
                uri: $"organization/{course.OrganizationId}/course/{course.Id}", 
                value: course.Id
            );
        }


        private async Task<bool> AreAllTeachersMembersAsync(CourseCreationRequest request) 
        {
            return await _dbContext
                .CourseMembers
                .Where(cm => request
                    .Teachers
                    .Contains(cm.UserAccountId)
                )
                .AllAsync(cm => _dbContext
                    .OrganizationMembers
                    .Any(om => 
                        om.OrganizationId == request.OrganizationId && 
                        om.UserAccountId == cm.UserAccountId
                    )
                );
        }
    }
}
