using Cody.Models.Organizations.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationController 
    {
        [Authorize]
        [HttpGet("courses/is_duplicate/{title}")]
        public async Task<IActionResult> IsDuplicate(string title) 
        {
            var isDuplicate = await IsDuplicateAsync(new () {
                Title = title,
            });

            return Ok(isDuplicate); 
        } 

        private async Task<bool> IsDuplicateAsync(Course course)
        {
            return await _dbContext
                .Courses
                .AnyAsync(c => c.Title == course.Title);
        }
    }
}
