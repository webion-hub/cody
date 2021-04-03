using Cody.Models.Users;
using Cody.Utilities;

namespace Cody.Security.Authorization
{
    internal static class Roles
    {
        public const string Admin = "Admin";
        public const string User = "User";


        public static bool TryGet(string maybeRole, out UserRole role)
        {
            var result = Utility.MaybeGetEnumFrom<UserRole>(maybeRole);
            if (result is null) {
                role = default;
                return false;
            }

            role = result.Value;
            return true;
        }
    }
}
