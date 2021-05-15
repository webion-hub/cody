using Cody.Models.Organizations.Courses;
using Cody.Utilities.QueryFilters;
using System.Linq;
using System.Text.RegularExpressions;

namespace Cody.QueryExtensions
{
    public static partial class OrganizationQueries
    {
        public static IQueryable<Course> DefaultMatch(this QueryFilter<Course> self)
        {
            return self
                .OnNotNull(rp => c =>
                    rp.Name == "title" && c.Title != null
                )
                .OnMatchExact(rp => c =>
                    (rp.Name == "id" && c.Id.ToString() == rp.Value) ||
                    (rp.Name == "title" && c.Title == rp.Value)
                )
                .OnDefault(k => c =>
                    Regex.IsMatch(c.Title, k.Pattern, RegexOptions.IgnoreCase)
                )
                .Filter();
        }
    }
}
