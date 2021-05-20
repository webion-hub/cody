using Cody.Extensions;
using Cody.QueryExtensions;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationsCoursesController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCourses(
            [FromRoute] int organizationId,
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            var members = _dbContext
                .Organizations
                .ThatArePublic()
                .ThatHaveNotBeenDeleted()
                .Where(o => o.Id == organizationId)

                .Include(o => o.Courses)
                .SelectMany(o => o.Courses)
                
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .Format();

            var result = await SearchResult.FormatAsync(
                results: members,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }
    }
}
