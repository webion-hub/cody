using System.Linq;
using QueryableUser = System.Linq.IQueryable<Cody.Models.UserAccount>;

namespace Cody.QueryExtensions
{
    public static partial class UserAccountQueries
    {
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
