using Cody.Contexts;
using Cody.Extensions;
using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation
{
    public class UserCreationValidator: UserValidation
    {
        public UserCreationValidator(CodyContext dbContext) 
            : base(dbContext)
        { }


        protected override void MaybeReject(UserAccount user)
        {
            base.MaybeReject(user);
            if (!WasRejected)
                _rejectReasons.AddRange(MaybeUserExists(user));
        }

        private IEnumerable<string> MaybeUserExists(UserAccount user)
        {
            if (_dbContext.UserExists(user.Username))
                yield return "username_exists";

            if (_dbContext.UserExists(user.Email))
                yield return "email_exists";
        }
    }
}
