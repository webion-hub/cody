using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("user_account_role")]
    public class UserAccountRole
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
