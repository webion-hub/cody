using Cody.Models.Users;
using Cody.Utilities.QueryFilters;
using System.Linq;
using System.Text.RegularExpressions;

namespace Cody.QueryExtensions
{
    public partial class UserAccountQueries
    {
        public static IQueryable<UserAccount> DefaultMatch(this QueryFilter<UserAccount> self)
        {
            return self.Where(k => u =>
                u.AccountDetail.BirthDate == k ||
                u.AccountDetail.RegistrationDate == k ||

                Regex.IsMatch(u.Id.ToString(), k.Pattern) ||
                Regex.IsMatch(u.Username, k.Pattern, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.Email, k.Pattern, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.AccountDetail.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.AccountDetail.Surname, k.Pattern, RegexOptions.IgnoreCase)
            );
        }
    }
}
