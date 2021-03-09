using Cody.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class SplitWordsFilter<T> : QueryFilter<T>
    {
        public SplitWordsFilter(IQueryable<T> query, string filter)
            : this(query, filter.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        { }

        public SplitWordsFilter(IQueryable<T> query, IEnumerable<string> filters)
            : base(query, filters.Select(f => Keyword.From(f)))
        { }
    }
}
