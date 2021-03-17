using Cody.Models;
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
        public static implicit operator UserAccount(UserRegistrationRequest self)
        {
            return new UserAccount
            {
                Username = self.Username.Trim(),
                Email = self.Email.Trim(),
                PlainPassword = self.Password,
                AccountDetail = self.AccountDetail,
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
        public static implicit operator UserAccountDetail(RegistrationRequestDetails self)
        {
            return new UserAccountDetail
            {
                Name = self.Name.Trim(),
                Surname = self.Surname.Trim(),
                BirthDate = self.BirthDate,
                RegistrationDate = DateTime.Now,
            };
        }
    }
}
