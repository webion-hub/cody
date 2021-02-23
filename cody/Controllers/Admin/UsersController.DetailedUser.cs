using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    public partial class UsersController
    {
        private record DetailedUser(
            int Id,
            string Username,
            string Email,
            UserDetail Detail,
            UserPicture ProfilePicture,
            UserSchool School
        );

        private record UserDetail(
            string Name,
            string Surname,
            DateTime BirthDate
        );

        private record UserPicture(
            string FilePath  
        );

        private record UserSchool(
            int Id,
            string Name,
            string City,
            string Country
        );
    }
}
