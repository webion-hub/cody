using Microsoft.EntityFrameworkCore;
using System.Linq;
using IncludableDetail = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserAccountDetail>;
using IncludableState = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserAccountState>;
using IncludableProfilePicture = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserProfilePicture>;
using IncludablePassword = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserAccountPassword>;
using IncludableRole = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserAccountRole>;
using IncludableBiography = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.UserBiography>;
using IncludableTheme = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, Cody.Models.Users.PreferredTheme>;
using IncludableOrganizations = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.Users.UserAccount, System.Collections.Generic.List<Cody.Models.Organizations.OrganizationMember>>;
using Cody.Models.Users;

namespace Cody.QueryExtensions
{
    public static partial class UserAccountQueries
    {
        public static IncludableDetail IncludingDetail(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.AccountDetail);
        }

        public static IncludablePassword IncludingPassword(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.Password);
        }

        public static IncludableRole IncludingRole(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.AccountRole);
        }

        public static IncludableState IncludingState(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.AccountState);
        }

        public static IncludableProfilePicture IncludingProfilePicture(this IQueryable<UserAccount> self)
        {
            return self
                .Include(u => u.AccountDetail)
                .ThenInclude(ad => ad.ProfilePicture);
        }

        public static IncludableBiography IncludingBiography(this IQueryable<UserAccount> self)
        {
            return self
                .Include(u => u.AccountDetail)
                .ThenInclude(ad => ad.Biography);
        }

        public static IncludableTheme IncludingTheme(this IQueryable<UserAccount> self)
        {
            return self
                .Include(u => u.AccountDetail)
                .ThenInclude(ad => ad.PreferredTheme);
        }

        public static IncludableOrganizations IncludingOrganizations(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.Organizations);
        }
    }
}
