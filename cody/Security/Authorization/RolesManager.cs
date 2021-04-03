using Cody.Contexts;
using Cody.Models;
using Cody.Models.Users;
using Cody.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    internal class RolesManager
    {
        public static bool IsUserAdmin(UserAccount user)
        {
            if (user is null)
                return false;

            return user.Role == UserRole.Admin;
        }

        public static bool IsUserInRole(UserAccount user, string role)
        {
            if (user is null)
                return false;

            return user.Role.ToString() == role;
        }
    }
}
