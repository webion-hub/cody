using Cody.Contexts;
using Cody.Models;
using Cody.Security.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Helpers
{
    internal class UserAccountInfoProps
    {
        public const string Username = "username";
        public const string Email = "email";
        public const string Name = "name";
        public const string Surname = "surname";
        public const string BirthDate = "birthDate";
        public const string Role = "role";
        public const string RegistrationDate = "registrationDate";
        public const string Biography = "biography";


        private readonly CodyContext _dbContext;
        private readonly UserAccount _user;

        public UserAccountInfoProps(CodyContext dbContext, UserAccount user)
        {
            _dbContext = dbContext;
            _user = user;
        }


        public async Task<object> GetAsync(string prop) => prop switch
        {
            Username         => _user.Username,
            Email            => _user.Email,
            Name             => _user.AccountDetail.Name,
            Surname          => _user.AccountDetail.Surname,
            BirthDate        => _user.AccountDetail.BirthDate,
            Role             => _user.AccountRole?.Name,
            RegistrationDate => _user.AccountDetail.RegistrationDate,
            Biography        => await GetBiographyAsync().ContinueWith(b => b.Result?.Contents),

            _ => null,
        };


        public async Task SetAsync(string prop, object val)
        {
            var value = val?.ToString();
            switch (prop)
            {
                case Username:  _user.Username = value;                                     break;
                case Email:     _user.Email = value;                                        break;
                case Name:      _user.AccountDetail.Name = value;                           break;
                case Surname:   _user.AccountDetail.Surname = value;                        break;
                case BirthDate: _user.AccountDetail.BirthDate = DateTime.Parse(value);      break;
                case Role:      SetRole(value);                                             break;
                case Biography: await SetBiographyAsync(value);                             break;
            }
        }


        private void SetRole(string role)
        {
            RolesManager
                .Using(_dbContext)
                .AssignOrRevokeIfNull(_user, role);
        }

        private async Task SetBiographyAsync(string value)
        {
            await LoadUserBiographyAsync();

            if (value is null) {
                MaybeRemoveBiography();
            }
            else {
                _user.AccountDetail.Biography ??= new();
                _user.AccountDetail.Biography.Contents = value;
            }
        }

        private void MaybeRemoveBiography()
        {
            if (_user.AccountDetail.Biography is not null)
                _dbContext.Biographies.Remove(_user.AccountDetail.Biography);
        }

        private async Task<UserBiography> GetBiographyAsync()
        {
            await LoadUserBiographyAsync();
            return _user.AccountDetail.Biography;
        }

        private async Task LoadUserBiographyAsync()
        {
            await _dbContext
                .Entry(_user.AccountDetail)
                .Reference(ad => ad.Biography)
                .LoadAsync();
        }
    }
}
