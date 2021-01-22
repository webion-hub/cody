using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security
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
