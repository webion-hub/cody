using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Models
{
    [Table("user_account_persistent_login_cookie")]
    public class UserAccountPersistentLoginCookie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        public byte[] Cookie { get; set; }
        public byte[] Salt { get; set; }


        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
