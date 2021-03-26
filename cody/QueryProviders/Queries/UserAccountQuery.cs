using Cody.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.QueryProviders.Queries
{
    internal class UserAccountQuery : CodyQuery<UserAccount>
    {
        public UserAccountQuery(IQueryable<UserAccount> query)
            : base(query)
        { }


        public UserAccountQuery ThatHaveNotBeenDeleted()
        {
            Chain(_ => _.Where(u => !u.AccountState.HasBeenDeleted));
            return this;
        }

        public UserAccountQuery ThatHaveBeenDeleted()
        {
            Chain(_ => _.Except(ThatHaveNotBeenDeleted()));
            return this;
        }

        public UserAccountQuery ThatHaveBeenVerified()
        {
            Chain(_ => _.Where(u => u.AccountState.IsEmailVerified));
            return this;
        }

        public UserAccountQuery ThatHaveNotBeenVerified()
        {
            Chain(_ => _.Except(ThatHaveBeenVerified()));
            return this;
        }
    }
}
