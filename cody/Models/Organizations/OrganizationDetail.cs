using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("organization_detail")]
    public class OrganizationDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }


        public string Description { get; set; }
        public string Website { get; set; }


        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}