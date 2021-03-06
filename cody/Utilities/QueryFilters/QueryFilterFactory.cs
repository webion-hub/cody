using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public enum FilterKind
    {
        SplitWords,
    }

    public static class QueryFilterFactory
    {
        public static QueryFilter<T> CreateNew<T>(IQueryable<T> query, string filter, FilterKind kind) => kind switch
        {
            FilterKind.SplitWords => new SplitWordsFilter<T>(query, filter),

            _ => throw new NotSupportedException(),
        };
    }
}
