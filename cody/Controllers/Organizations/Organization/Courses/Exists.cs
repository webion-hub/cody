using Cody.Models.Organizations.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationCoursesController 
    {
        [Authorize]
        [HttpGet("exists/{title}")]
        public async Task<IActionResult> Exists(string title) 
        {
            var isDuplicate = await ExistsAsync(new () {
                Title = title,
            });

            return Ok(isDuplicate); 
        } 

        private async Task<bool> ExistsAsync(Course course)
        {
            return await _dbContext
                .Courses
                .AnyAsync(c => c.Title == course.Title);
        }
    }
}
