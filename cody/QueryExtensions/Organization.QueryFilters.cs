using Cody.Models;
using Cody.Utilities.QueryFilters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationQueries
    {
        public static IQueryable<Organization> DefaultMatch(this QueryFilter<Organization> self)
        {
            return self.Where(k => o =>
                (k.MustHave("logo") && o.Detail.Logo != null) ||
                (k.MustHave("cover") && o.Detail.Cover != null) ||
                (k.MustHave("website") && o.Detail.Website != null) ||

                k.AsEnum<OrganizationKind>() == o.Kind ||

                Regex.IsMatch(o.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(o.Detail.Location, k.Pattern, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(o.Detail.Website, k.Pattern, RegexOptions.IgnoreCase)
            );
        }
    }
}
