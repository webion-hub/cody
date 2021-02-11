using Cody.Contexts;
using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Helpers
{
    public class UserAccountInfoProps
    {
        public const string Username = "username";
        public const string Email = "email";
        public const string Name = "name";
        public const string Surname = "surname";
        public const string BirthDate = "birthDate";
        public const string School = "school";


        private readonly CodyContext _dbContext;
        private readonly UserAccount _user;

        public UserAccountInfoProps(CodyContext dbContext, UserAccount user)
        {
            _dbContext = dbContext;
        }


        public object Get(string prop) => prop switch
        {
            Username  => _user.Username,
            Email     => _user.Email,
            Name      => _user.AccountDetail.Name,
            Surname   => _user.AccountDetail.Surname,
            BirthDate => _user.AccountDetail.BirthDate,
            School    => GetSchool(),

            _ => null,
        };

        private object GetSchool()
        {
            var school =_dbContext
                .Schools
                .Find(_user.AccountDetail.SchoolId);

            return new {
                school.Id,
                school.Name,
                school.City,
                school.Country,
            };
        }


        public void Set(string prop, string value)
        {
            switch (prop)
            {
                case Username:  _user.Username = value;                                  break;
                case Email:     _user.Email = value;                                     break;
                case Name:      _user.AccountDetail.Name = value;                        break;
                case Surname:   _user.AccountDetail.Surname = value;                     break;
                case BirthDate: _user.AccountDetail.BirthDate = DateTime.Parse(value);   break;
                case School:    _user.AccountDetail.SchoolId = int.Parse(value);         break;
            }
        }
    }
}
