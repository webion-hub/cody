using Cody.Db;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Cody.Security.Extensions;
using Cody.Db.Models.Organizations.Courses;

namespace Cody.Controllers
{
    [Route("api/user/bookmarks/courses")]
    [Authorize]
    [ApiController]
    public partial class BookmarkedCoursesController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public BookmarkedCoursesController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<CourseMember> GetJoinedCourses(int courseId)
        {
            var userId = HttpContext.User.GetId();
            return await _dbContext
                .CourseMembers
                .FirstOrDefaultAsync(om =>
                    om.UserAccountId == userId &&
                    om.CourseId == courseId
                );
        }
    }
}
