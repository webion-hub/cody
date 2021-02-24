using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    public partial class UsersController
    {
        public record UserFilter(
            int? Id,
            string Username,
            string Email,
            UserDetail Detail,
            UserPicture ProfilePicture,
            UserSchool School
        );

        public record UserDetail(
            string Name,
            string Surname,
            DateTime? BirthDate
        );

        public record UserPicture(
            string FilePath  
        );

        public record UserSchool(
            int? Id,
            string Name,
            string City,
            string Country
        );
    }
}
