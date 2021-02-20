using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("user_biography")]
    public class UserBiography
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int AccountDetailId { get; set; }
        public UserAccountDetail AccountDetail { get; set; }

        [MaxLength(64)]
        public string Contents { get; set; }
    }
}