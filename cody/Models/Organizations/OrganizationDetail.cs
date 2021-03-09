using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("organization_detail")]
    public class OrganizationDetail
    {
        public const int MAX_DESCRIPTION_LENGTH = 512;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        
        public string City { get; set; }
        public string Country { get; set; }


        [MaxLength(MAX_DESCRIPTION_LENGTH)]
        public string Description { get; set; }
        
        [Url]
        public string Website { get; set; }


        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}