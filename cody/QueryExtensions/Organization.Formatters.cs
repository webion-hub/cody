using Cody.Controllers.Responses.Formatters;
using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
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
