using Cody.Models.Organizations;
using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.PropertyValidators;
using Cody.Security.Validation.Rejection;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    public enum UserRole {
        User,
        Admin,
    }


    [Table("user_account")]
    public class UserAccount : IRejectable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }


        [Required]
        [DefaultUsernameLength]
        public string Username { get; set; }


        [Required]
        [Column(TypeName = "text")]
        public UserRole Role { get; set; }


        public UserAccountPassword Password { get; set; }

        [NotMapped]
        [DefaultPasswordLength]
        public string PlainPassword { get; set; }


        public UserAccountDetail AccountDetail { get; set; }
        public UserAccountState AccountState { get; set; }
        public List<UserAccountPersistentLoginCookie> LoginCookies { get; set; }
        public List<UserRefreshToken> RefreshTokens { get; set; }
        public List<OrganizationMember> Organizations { get; set; }


        public RejectionResult MaybeReject()
        {
            return Rejector.MaybeReject(new()
            {
                { "email", Email, FieldValidation.IsValidEmail },
                { "password", PlainPassword, FieldLength.IsValidPasswordLength },
                { "username", Username, FieldLength.IsValidUsernameLength, ValidationOptions.NotNull },
            })
            .AlongWith(AccountDetail);
        }
    }
}
