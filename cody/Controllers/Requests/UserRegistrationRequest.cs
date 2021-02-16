using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record UserRegistrationRequest (
        string Username,
        string Email,
        string Password,
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
        string Name,
        string Surname,
        DateTime BirthDate,
        int? SchoolId
    ) {
        public static implicit operator UserAccountDetail(RegistrationRequestDetails self)
        {
            return new UserAccountDetail
            {
                Name = self.Name.Trim(),
                Surname = self.Surname.Trim(),
                BirthDate = self.BirthDate,
                SchoolId = self.SchoolId,
                RegistrationDate = DateTime.Now,
            };
        }
    }
}
