using Cody.Security.Validation.Attributes;
using Cody.Db.Models.Organizations.Courses;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;

namespace Cody.Controllers.Requests
{
    public record CourseCreationRequest (
        [Required, DefaultMaxLength] 
        string Title,
        
        [DefaultDescriptionLength] 
        string Description,

        [Required]
        int OrganizationId,

        [Required]
        int[] Teachers
    ) {
        public Course AsCourse() 
        {
            var teachers = Teachers.Select(id => new Member {
                UserAccountId = id,
                Role = MemberRole.Teacher,
            });

            return new Course {
                Title = Title,
                Description = Description,
                OrganizationId = OrganizationId,
                Members = teachers.ToList(),
            };
        }
    }
}
