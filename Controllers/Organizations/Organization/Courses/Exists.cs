using Cody.Db.Models.Organizations.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationCoursesController 
    {
        [Authorize]
        [HttpGet("exists/{title}")]
        public async Task<IActionResult> Exists(int organizationId, string title) 
        {
            var isDuplicate = await ExistsAsync(new () {
                OrganizationId = organizationId, 
                Title = title,
            });

            return Ok(isDuplicate); 
        }

        private async Task<bool> ExistsAsync(Course course)
        {
            return await _dbContext
                .Courses
                .Where(c => c.Title == course.Title)
                .Where(c => c.OrganizationId == course.OrganizationId)
                .AnyAsync();
        }
    }
}
