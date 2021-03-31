using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("user_account_state")]
    public class UserAccountState
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        
        [Required] public Guid VerificationKey { get; set; }
        [Required] public bool IsEmailVerified { get; set; }
        [Required] public bool HasBeenDeleted { get; set; }

        
        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
