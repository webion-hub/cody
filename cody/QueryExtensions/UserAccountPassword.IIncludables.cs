using Microsoft.EntityFrameworkCore;
using IncludableMetadata = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.Argon2PasswordMetadata>;
using IncludablePassword = Microsoft.EntityFrameworkCore.Query.IIncludableQueryable<Cody.Models.UserAccount, Cody.Models.UserAccountPassword>;

namespace Cody.QueryExtensions
{
    public static partial class UserAccountPasswordQueries
    {
        public static IncludableMetadata WithMetadata(this IncludablePassword self)
        {
            return self.ThenInclude(p => p.Metadata);
        }
    }
}
