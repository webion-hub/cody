using Cody.Models.Organizations;
using Cody.Utilities.QueryFilters;
using System.Linq;
using System.Text.RegularExpressions;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationQueries
    {
        public static IQueryable<Organization> DefaultMatch(this QueryFilter<Organization> self)
        {
            return self
                .OnNotNull(rp => o =>
                    (rp.Name == "logo" && o.Detail.Logo != null) ||
                    (rp.Name == "cover" && o.Detail.Cover != null) ||
                    (rp.Name == "website" && o.Detail.Website != null)
                )
                .OnMatchExact(rp => o =>
                    (rp.Name == "id" && o.Id.ToString() == rp.Value) ||
                    (rp.Name == "name" && o.Name == rp.Value)
                )
                .OnDefault(k => o =>
                    k.AsEnum<OrganizationKind>() == o.Kind ||

                    Regex.IsMatch(o.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Location, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Website, k.Pattern, RegexOptions.IgnoreCase)
                )
                .Filter();
        }
    }
}
