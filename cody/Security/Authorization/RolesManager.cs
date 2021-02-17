using Cody.Contexts;
using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    public class RolesManager
    {
        private readonly CodyContext _dbContext;


        public RolesManager(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }

        public static RolesManager Using(CodyContext dbContext) => new (dbContext);


        public void AssignOrRevokeIfNull(UserAccount user, string role)
        {
            if (user.AccountRole is not null)
                AssignTo(user, role);

            else RevokeFrom(user);
        }

        public void AssignTo(UserAccount user, string role)
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
