using cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Security
{
    public class AttemptedCookieBreachException : UnauthorizedAccessException
    {
        public UserAccount AffectedUser { get; init; }

        public AttemptedCookieBreachException(UserAccount affectedAccount)
            : base()
        {
            AffectedUser = affectedAccount;
        }
    }
}
