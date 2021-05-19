using Cody.Controllers.Responses.Formatters;
using Cody.Models;
using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
    public partial class UserAccountQueries
    {
        public static IQueryable<object> FormatFor(
            this IQueryable<UserAccount> self,
            UserAccount user
        ) {
            return new UsersResponseFormatter(user, self).Format();
        }
    }
}
