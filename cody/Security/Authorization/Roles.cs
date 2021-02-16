using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    public static class Roles
    {
        public const string Admin = "Admin";

        private static readonly HashSet<string> _hashedRoles = new()
        {
            Admin,
        };


        public static bool Exists(string role)
        {
            return _hashedRoles.Contains(role);
        }
    }
}
