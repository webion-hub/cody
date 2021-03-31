using Microsoft.EntityFrameworkCore;
using System.Linq;
using QueryableUser = System.Linq.IQueryable<Cody.Models.Users.UserAccount>;

namespace Cody.QueryExtensions
{
    public static partial class UserAccountQueries
    {
        public static QueryableUser GetBy(this QueryableUser self, string usernameOrEmail)
        {
            return self.Where(u =>
                u.Username == usernameOrEmail ||
                u.Email == usernameOrEmail
            );
        }


        public static QueryableUser ThatHaveBeenDeleted(this QueryableUser self)
        {
            return self.Where(u => u.AccountState.HasBeenDeleted);
        }

        public static QueryableUser ThatHaveNotBeenDeleted(this QueryableUser self)
        {
            return self.Except(self.ThatHaveBeenDeleted());
        }


        public static QueryableUser ThatHaveBeenVerified(this QueryableUser self)
        {
            return self.Where(u => u.AccountState.IsEmailVerified);
        }

        public static QueryableUser ThatHaveNotBeenVerified(this QueryableUser self)
        {
            return self.Except(self.ThatHaveBeenVerified());
        }
    }
}
