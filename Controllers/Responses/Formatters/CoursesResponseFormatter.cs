using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using System.Linq;
using Cody.Db.Models.Organizations.Courses;

namespace Cody.Controllers.Responses.Formatters
{
    internal class CoursesResponseFormatter : ResponseFormatter<Course>
    {
        public CoursesResponseFormatter(UserAccount sender, IQueryable<Course> values) 
            : base(sender, values)
        {}


        public override IQueryable<object> Format()
        {
            return 
                from c in Values
                let m = c.Members
                let t = m
                    .Where(m => m.Role == CourseMemberRole.Teacher)
                    .Select(t => t.UserAccount)

                let u = 
                    m.Where(cm => cm.UserAccountId == CallerId)

                orderby c.Id ascending
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
                    IsBookmarked = u.Any(cm => cm.IsCourseBookmarked)
                };
        }
    }
}
