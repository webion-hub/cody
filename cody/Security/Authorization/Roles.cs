using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    internal static class Roles
    {
        private static readonly HashSet<string> _hashedRoles = new()
        {
            Admin,
            User,
        };

        public const string Admin = "Admin";
        public const string User = "User";


        public static bool Exists(string role)
        {
            return _hashedRoles.Contains(role);
        }
    }
}
