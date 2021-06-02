using Cody.Db.Models.Users;
using System;

namespace Cody.Security
{
    internal class AttemptedCookieBreachException : UnauthorizedAccessException
    {
        public UserAccount AffectedUser { get; init; }

        public AttemptedCookieBreachException(UserAccount affectedAccount)
            : base()
        {
            AffectedUser = affectedAccount;
        }
    }
}
