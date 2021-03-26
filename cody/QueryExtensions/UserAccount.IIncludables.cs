using Cody.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using IncludableDetail = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserAccountDetail>;
using IncludableState = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserAccountState>;
using IncludableProfilePicture = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserProfilePicture>;
using IncludablePassword = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserAccountPassword>;
using IncludableRole = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserAccountRole>;
using IncludableBiography = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserBiography>;
using IncludableOrganizations = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, System.Collections.Generic.List<Cody.Models.OrganizationMember>>;

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


        public static IncludableOrganizations IncludingOrganizations(this IQueryable<UserAccount> self)
        {
            return self.Include(u => u.Organizations);
        }
    }
}
