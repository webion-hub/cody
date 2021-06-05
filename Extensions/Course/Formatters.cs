using Cody.Db.Models.Organizations.Courses;
using Cody.Db.Models.Users;
using System.Linq;

namespace Cody.Db.Extensions
{
    public static partial class CourseQueries
    {
        public static IQueryable<object> FormatFor(this IQueryable<Course> self, UserAccount user) 
        {
            return
                from c in self
                let m = c.Members
                let t = m
                    .Where(m => m.Role == CourseMemberRole.Teacher)
                    .Select(t => t.UserAccount)

                let uc = m.Where(cm => cm.UserAccountId == user.Id)

                select new {
                    c.Id,
                    c.Title,
                    c.Description,
                    Teachers = t.Select(t => new {
                        t.Id,
                        t.Username,
                        t.AccountDetail.Name,
                        t.AccountDetail.Surname,
                    }),
                    IsBookmarked = uc == null ? false : uc.Any(cm => cm.IsCourseBookmarked)
                };
        }

        public static IQueryable<object> Format(this IQueryable<Course> self) 
        {
            return
                from c in self
                let m = c.Members
                let t = m
                    .Where(m => m.Role == CourseMemberRole.Teacher)
                    .Select(t => t.UserAccount)

                select new {
                    c.Id,
                    c.Title,
                    c.Description,
                    Teachers = t.Select(t => new {
                        t.Id,
                        t.Username,
                        t.AccountDetail.Name,
                        t.AccountDetail.Surname,
                    })
                };
        }
    }
}
