using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models.Users
{
    [Table("user_refresh_token")]
    public class UserRefreshToken
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Required] public byte[] Token { get; set; }
        [Required] public byte[] Salt { get; set; }


        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
