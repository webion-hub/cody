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


        public static string GetPropFor(string prop, UserAccount user) => prop switch
        {
            Username  => user.Username,
            Email     => user.Email,
            Name      => user.AccountDetail.Name,
            Surname   => user.AccountDetail.Surname,
            BirthDate => user.AccountDetail.BirthDate.ToString(),
            School    => user.AccountDetail.SchoolId.ToString(),

            _ => null,
        };

        public static void SetPropFor(string prop, string value, UserAccount user)
        {
            switch (prop)
            {
                case Username:  user.Username = value;                                  break;
                case Email:     user.Email = value;                                     break;
                case Name:      user.AccountDetail.Name = value;                        break;
                case Surname:   user.AccountDetail.Surname = value;                     break;
                case BirthDate: user.AccountDetail.BirthDate = DateTime.Parse(value);   break;
                case School:    user.AccountDetail.SchoolId = int.Parse(value);         break;
            }
        }
    }
}
