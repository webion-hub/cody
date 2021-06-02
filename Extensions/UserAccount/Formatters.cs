using Cody.Controllers.Responses.Formatters;
using Cody.Db.Models;
using Cody.Db.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Db.Extensions
{
    public static class UserAccountQueries
    {
        public static IQueryable<object> FormatFor(
            this IQueryable<UserAccount> self,
            UserAccount user
        ) {
            return new UsersResponseFormatter(user, self).Format();
        }
    }
}
