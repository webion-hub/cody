using Cody.Models.Organizations;
using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.PropertyValidators;
using Cody.Security.Validation.Rejection;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("organization_detail")]
    public class OrganizationDetail : IRejectable
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [DefaultMaxLength] 
        public string Location { get; set; }


        [DefaultDescriptionLength]
        public string Description { get; set; }
        
        [Url]
        [DefaultMaxLength]
        public string Website { get; set; }


        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }


        public OrganizationCover Cover { get; set; }
        public OrganizationLogo Logo { get; set; }


        public RejectionResult MaybeReject()
        {
            return Rejector.MaybeReject(new()
            {
                { "city", Location, FieldLength.IsBelowDefaultMax },
                { "website", Website, FieldLength.IsBelowDefaultMax },
                { "description", Description, default, FieldLength.MaxDescriptionLength },
            });
        }
    }
}