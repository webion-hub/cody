using Cody.Contexts;
using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    internal class RolesManager
    {
        private readonly CodyContext _dbContext;


        public RolesManager(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }

        public static RolesManager Using(CodyContext dbContext) => new (dbContext);


        public static bool IsUserInRole(UserAccount user, string role)
        {
            if (user is null)
                return false;

            if (user.AccountRole is null)
                return role is "" or Roles.User;

            return user.AccountRole.Name == role;
        }


        public void AssignOrRevokeIfNull(UserAccount user, string role)
        {
            if (role is not null)
                AssignTo(user, role);

            else RevokeFrom(user);
        }

        public static void AssignTo(UserAccount user, string role)
        {
            if (!Roles.Exists(role))
                throw new ArgumentException($"Inexistent role: {role}");

            user.AccountRole ??= new();
            user.AccountRole.Name = role;
        }

        public void RevokeFrom(UserAccount user)
        {
            if (user.AccountRole is not null)
                _dbContext.Roles.Remove(user.AccountRole);
        }

    }
}
