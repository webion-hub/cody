using Cody.Db;
using Cody.Db.Models.Users;
using Cody.Db.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace Cody.Security.Validation
{
    internal class UserUpdateValidator: UserValidation
    {
        public UserUpdateValidator(CodyContext context)
            : base(context)
        { }


        protected override void MaybeReject(UserAccount user)
        {
            base.MaybeReject(user);
            if (!WasRejected)
                _rejectReasons.AddRange(MaybeFieldsAreDuplicated(user));
        }

        private IEnumerable<string> MaybeFieldsAreDuplicated(UserAccount user)
        {
            if (IsFieldDuplicated(user.Username, user))
                yield return "username_exists";

            if (IsFieldDuplicated(user.Email, user))
                yield return "email_exists";
        }

        private bool IsFieldDuplicated(string usernameOrEmail, UserAccount user)
        {
            return _dbContext
                .UserAccounts
                .GetBy(usernameOrEmail)
                .Any(u => u.Id != user.Id);
        }
    }
}
