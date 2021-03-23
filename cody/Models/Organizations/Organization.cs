using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.PropertyValidators;
using Cody.Security.Validation.Rejection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    public enum OrganizationKind {
        School,
        Company,
        Team,
    }

    [Table("organization")]
    public class Organization : IRejectable
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Required]
        [DefaultMinMaxLength]
        public string Name { get; set; }
        
        [Required]
        [Column(TypeName = "text")]
        public OrganizationKind Kind { get; set; }
        

        public OrganizationState State { get; set; }
        public OrganizationDetail Detail { get; set; }


        public List<OrganizationMember> Members { get; set; }


        [NotMapped]
        public OrganizationMember Owner 
        {
            get => Members
                .Where(m => m.Role == OrganizationRole.Owner)
                .SingleOrDefault();
        }


        public RejectionResult MaybeReject()
        {
            return Rejector.MaybeReject(new() {{ 
                "name", 
                Name, 
                FieldLength.IsWithinDefaultMinMax, 
                ValidationOptions.NotNull 
            }})
            .AlongWith(Detail);
        }
    }
}
