using Cody.Contexts;
using Cody.QueryProviders.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.QueryProviders
{
    internal class UserAccountQueryProvider : QueryProvider
    {
        public UserAccountQueryProvider(CodyContext dbContext)
            : base(dbContext)
        { }

        
        public UserAccountQuery GetAllUsers() => null;
    }
}
