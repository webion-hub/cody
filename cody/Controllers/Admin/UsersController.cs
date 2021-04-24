using Cody.Contexts;
using Cody.Extensions;
using Cody.QueryExtensions;
using Cody.Security.Authorization;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    [Route("api/admin/users")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public partial class UsersController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public UsersController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Get(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            var response = await SearchResult.FormatAsync(
                results: GetFilteredUsers(filter),
                limit: limit,
                offset: offset
            );

            return Ok(response);
        }


        private IQueryable<object> GetFilteredUsers(string filter)
        {
            return _dbContext
                .UserAccounts
                .IncludingDetail()
                .IncludingProfilePicture()
                .IncludingState()
                .IncludingOrganizations()

                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .FormatFor(null);
        }
    }
}
