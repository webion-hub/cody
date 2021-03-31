using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using Cody.Models.Users;
using Cody.QueryExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation
{
    public class UserCreationValidator : UserValidation
    {
        public UserCreationValidator(CodyContext dbContext) 
            : base(dbContext)
        { }


        protected override void MaybeReject(UserAccount user)
        {
            base.MaybeReject(user);
            if (!WasRejected)
                _rejectReasons.AddRange(MaybeUserExistsAsync(user));
        }

        private IEnumerable<string> MaybeUserExistsAsync(UserAccount user)
        {
            var users = _dbContext.UserAccounts;

            if (users.ExistsAsync(user.Username).Result)
                yield return "username_exists";

            if (users.ExistsAsync(user.Email).Result)
                yield return "email_exists";
        }
    }
}
