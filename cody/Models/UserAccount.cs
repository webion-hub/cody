using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace cody.Models
{
    [Table("user_account")]
    public class UserAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


        public UserAccountDetail AccountDetail { get; set; }
    }
}
