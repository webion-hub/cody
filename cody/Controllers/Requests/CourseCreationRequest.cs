using Cody.Security.Validation.Attributes;
using Cody.Models.Organizations.Courses;
using System.ComponentModel.DataAnnotations;

namespace Cody.Controllers.Requests
{
    public record CourseCreationRequest (
        [Required, DefaultMaxLength] 
        string Title,
        
        [DefaultDescriptionLength] 
        string Description,

        [Required]
        int OrganizationId
    ) {
        public Course AsCourse() => new Course
        {
            Title = Title,
            Description = Description,
            OrganizationId = OrganizationId,
        };
    }
}
