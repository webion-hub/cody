using Cody.Models;
using Cody.Models.Users;
using Cody.Security.Authorization;
using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record UserRegistrationRequest (
        [Required, DefaultUsernameLength]
        string Username,

        [Required, EmailAddress, DefaultMaxLength]
        string Email,

        [Required, DefaultPasswordLength]
        string Password,

        [Required]
        RegistrationRequestDetails AccountDetail
    ) {
        public UserAccount AsUserAccount()
        {
            return new UserAccount
            {
                Username = Username.Trim(),
                Email = Email.Trim(),
                PlainPassword = Password,
                AccountDetail = AccountDetail.AsUserAccountDetail(),
            };
        }
    }


    public record RegistrationRequestDetails (
        [Required, DefaultMaxLength, NameOrSurname]
        string Name,

        [Required, DefaultMaxLength, NameOrSurname]
        string Surname,

        [Required]
        DateTime BirthDate
    ) {
        public UserAccountDetail AsUserAccountDetail()
        {
            return new UserAccountDetail
            {
                Name = Name.Trim(),
                Surname = Surname.Trim(),
                BirthDate = BirthDate,
                RegistrationDate = DateTime.Now,
            };
        }
    }
}
