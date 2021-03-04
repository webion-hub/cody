using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    public enum OrganizationRole
    {
        Owner,
        Admin,
        User,
    }


    [Table("organization_member")]
    public class OrganizationMembership
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
