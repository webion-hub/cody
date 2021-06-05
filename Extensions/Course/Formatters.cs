using Cody.Controllers.Responses.Formatters;
using Cody.Db.Models.Organizations.Courses;
using Cody.Db.Models.Users;
using System.Linq;

namespace Cody.Db.Extensions
{
    public static partial class CourseQueries
    {
        public static IQueryable<object> Format(this IQueryable<Course> self) 
        {
            return self.FormatFor(null);
        }

        public static IQueryable<object> FormatFor(this IQueryable<Course> self, UserAccount user) 
        {
            return new CoursesResponseFormatter(user, self).Format();
        }
    }
}
