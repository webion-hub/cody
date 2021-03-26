using Cody.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.QueryProviders
{
    internal abstract class QueryProvider
    {
        protected readonly CodyContext _dbContext;

        protected QueryProvider(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
