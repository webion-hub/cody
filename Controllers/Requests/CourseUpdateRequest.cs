using Cody.Security.Validation.Attributes;

namespace Cody.Controllers.Requests
{
  public record CourseUpdateRequest (
        [DefaultMaxLength] 
        string Title,
        
        [DefaultDescriptionLength] 
        string Description
    );
}
