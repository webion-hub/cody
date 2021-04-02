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
            return self.Where(k => k.RequestedProperty.IsRequested
                ? k.RequestedProperty.MustNotBeNull
                    ? o =>
                        (k.RequestedProperty.PropertyName == "logo" && o.Detail.Logo != null) ||
                        (k.RequestedProperty.PropertyName == "cover" && o.Detail.Cover != null) ||
                        (k.RequestedProperty.PropertyName == "website" && o.Detail.Website != null)
                    : o =>
                        (k.RequestedProperty.PropertyName == "id" && o.Id.ToString() == k.RequestedProperty.Value) ||
                        (k.RequestedProperty.PropertyName == "name" && o.Name == k.RequestedProperty.Value)
                : o =>
                    k.AsEnum<OrganizationKind>() == o.Kind ||

                    Regex.IsMatch(o.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Location, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(o.Detail.Website, k.Pattern, RegexOptions.IgnoreCase)
            );
        }
    }
}
