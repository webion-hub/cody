using Cody.Controllers.Responses.Formatters;
using Cody.Models.Organizations.Courses;
using Cody.Models.Users;
using System.Linq;

namespace Cody.QueryExtensions
{
    public static partial class CourseQueries
    {
        public static IQueryable<object> Format(this IQueryable<Course> self) 
        {
            return self.Select(c => new 
            {
                c.Id,
                c.Title,
                c.Description,
            });
        }
    }
}
