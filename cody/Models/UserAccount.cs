using Cody.Security;
using Cody.Security.Validation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("user_account")]
    public class UserAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email")]
        public string Email { get; set; }


        [Required]
        [StringLength(28, MinimumLength = 4)]
        public string Username { get; set; }


        public UserAccountPassword Password { get; set; }

        [NotMapped]
        public string PlainPassword { get; set; }


        public UserAccountDetail AccountDetail { get; set; }
        public UserAccountState AccountState { get; set; }
        public UserAccountRole AccountRole { get; set; }
        public List<UserAccountPersistentLoginCookie> LoginCookies { get; set; }


        public IEnumerable<string> GetRejectReasons()
        {
            if (PlainPassword.Length is < 8 or > 128)
                yield return "password";

            if (Username.Length is < 4 or > 28)
                yield return "username";

            if (!FieldValidation.IsValidEmail(Email))
                yield return "email";
        }
    }
}
