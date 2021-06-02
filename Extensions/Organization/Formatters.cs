using Cody.Controllers.Responses.Formatters;
using Cody.Db.Models;
using Cody.Db.Models.Organizations;
using Cody.Db.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Db.Extensions
{
    public static partial class OrganizationQueries
    {
        public static IQueryable<object> FormatFor(
            this IQueryable<Organization> self, 
            UserAccount user
        ) {
            return new OrganizationsResponseFormatter(user, self).Format();
        }
    }
}
