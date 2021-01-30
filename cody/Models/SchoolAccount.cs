using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("school_account")]
    public class SchoolAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public string Name { get; set; }
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
    

        public string RedirectUrl { get; set; }


        public SchoolAccountState State { get; set; }
        public List<UserAccountDetail> Students { get; set; }
    }
}
