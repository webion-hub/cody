using Cody.Db.Models.Users;
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
                from course in Values
                let members = course.Members
                let teachers =
                    from cm in members
                    from om in course
                        .Organization
                        .Members
                        .Where(om => 
                            om.UserAccountId == cm.UserAccountId &&
                            om.OrganizationId == course.OrganizationId
                        )
                        .DefaultIfEmpty()

                    where cm.Role == CourseMemberRole.Teacher
                    select new {
                        cm.UserAccount.Id,
                        cm.UserAccount.Username,
                        cm.UserAccount.AccountDetail.Name,
                        cm.UserAccount.AccountDetail.Surname,
                        Role = om.Role.ToString(),
                    }
                
                let user = 
                    members.Where(cm => cm.UserAccountId == CallerId)

                orderby course.Id ascending
                select new {
                    course.Id,
                    course.Title,
                    course.Description,
                    Teachers = teachers,
                    IsBookmarked = user.Any(cm => cm.IsCourseBookmarked)
                };
        }
    }
}
