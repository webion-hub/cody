using Cody.Models.Organizations;
using Cody.Models.Organizations.Courses;
using System.Linq;
using QMember = System.Linq.IQueryable<Cody.Models.Organizations.Courses.Member>;

namespace Cody.QueryExtensions
{
    public static partial class CourseMemberQueries
    {
        public static QMember ThatBelongToCourse(this QMember self, int courseId)
        {
            return self.Where(cm => cm.CourseId == courseId);
        }

        public static QMember ThatHaveUserId(this QMember self, int userId)
        {
            return self.Where(cm => cm.UserAccountId == userId);
        }

        public static QMember ThatAreTeachers(this QMember self)
        {
            return self.Where(cm => cm.Role == MemberRole.Teacher);
        }

        public static QMember ThatAre(this QMember self, MemberRole role)
        {
            return self.Where(cm => cm.Role == role);
        }
    }
}
