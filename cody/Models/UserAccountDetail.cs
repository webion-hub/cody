using Cody.Security;
using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.Rejection;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("user_account_detail")]
    public class UserAccountDetail : IRejectable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, DefaultMaxLength] public string Name { get; set; }
        [Required, DefaultMaxLength] public string Surname { get; set; }
        [Required] public DateTime BirthDate { get; set; }
        [Required] public DateTime RegistrationDate { get; set; }


        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }


        public UserBiography Biography { get; set; }
        public UserProfilePicture ProfilePicture { get; set; }
        public UserPreferredTheme PreferredTheme { get; set; }


        public RejectionResult MaybeReject()
        {
            return Rejector.MaybeReject(new()
            {
                { "name", Name, FieldValidation.IsValidNameOrSurname },
                { "name", Name, FieldLength.IsBelowDefaultMax },
                
                { "surname", Surname, FieldValidation.IsValidNameOrSurname },
                { "surname", Surname, FieldLength.IsBelowDefaultMax },
            })
            .AlongWith(Biography);
        }
    }
}
