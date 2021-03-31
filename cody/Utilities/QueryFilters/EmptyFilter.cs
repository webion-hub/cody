using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class EmptyFilter<T> : QueryFilter<T>
    {
        public EmptyFilter(IQueryable<T> query) 
            : base(query, Enumerable.Empty<Keyword>())
        {}
    }
}
