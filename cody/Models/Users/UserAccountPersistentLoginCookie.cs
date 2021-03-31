using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("user_account_persistent_login_cookie")]
    public class UserAccountPersistentLoginCookie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        public byte[] Token { get; set; }
        public byte[] Salt { get; set; }


        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
