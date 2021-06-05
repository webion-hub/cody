using Cody.Db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers.User.Courses
{
    [Route("api/user/courses")]
    [Authorize]
    [ApiController]
    public partial class UserCoursesController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public UserCoursesController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}