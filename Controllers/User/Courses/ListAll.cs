using System.Linq;
using System.Threading.Tasks;
using Cody.Db.Extensions;
using Cody.Db.QueryFilters;
using Cody.Extensions;
using Cody.Security.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cody.Controllers.User.Courses
{
    public partial class UserCoursesController
    {
        [HttpGet]
        public async Task<IActionResult> ListAll(
            [FromQuery] string filter,
            [FromQuery] int? offset,
            [FromQuery] int? limit
        ) {
            var user = await HttpContext.GetLoggedUserAsync();
            var courses = _dbContext
                .CourseMembers
                .Where(cm => cm.UserAccountId == user.Id)
                .Select(cm => cm.Course)
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .FormatFor(user);

            var result = await SearchResult.FormatAsync(
                results: courses,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }
    }
}