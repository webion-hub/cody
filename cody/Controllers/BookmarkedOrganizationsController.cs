using Cody.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers
{
    [Route("user/bookmarks/organizations")]
    [Authorize]
    [ApiController]
    public partial class BookmarkedOrganizationsController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public BookmarkedOrganizationsController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
