using Cody.Models.Users;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Organizations
{
    public enum OrganizationRole
    {
        Owner,
        Admin,
        User,
    }


    [Table("organization_member")]
    public class OrganizationMember
    {
        [Required] public int OrganizationId { get; set; }
        [Required] public int UserAccountId { get; set; }


        [Column(TypeName = "text")]
        [Required] 
        public OrganizationRole Role { get; set; }


        public Organization Organization { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
