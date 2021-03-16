using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("organization_state")]
    public class OrganizationState
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        

        [Required] public bool HasBeenVerified { get; set; }
        [Required] public bool HasBeenDeleted { get; set; }


        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
