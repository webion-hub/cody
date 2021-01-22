using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("user_account_state")]
    public class UserAccountState
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        

        [Required] public Guid ValidationKey { get; set; }
        [Required] public bool IsEmailValid { get; set; }

        
        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
