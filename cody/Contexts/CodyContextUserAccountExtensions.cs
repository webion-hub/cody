using cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Contexts
{
    public static class CodyContextUserAccountExtensions
    {
        public static bool UserExists(this CodyContext context, string usernameOrEmail)
        {
            if (string.IsNullOrWhiteSpace(usernameOrEmail))
                return false;

            var userExists = context
                .MaybeGetUserBy(usernameOrEmail)
                .Any();

            return userExists;
        }


        public static IQueryable<UserAccount> MaybeGetUserBy(this CodyContext context, string usernameOrEmail)
        {
            var maybeUser =
                from user in context.UserAccounts
                where
                    user.Username == usernameOrEmail ||
                    user.Email == usernameOrEmail
                select user;

            return maybeUser;
        }
    }
}
