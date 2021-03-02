﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public enum FilterKind
    {
        SplitWords,
    }

    public static class QueryFilterFactory
    {
        public static IQueryFilter<T> CreateNew<T>(IQueryable<T> query, string filter, FilterKind kind) => kind switch
        {
            FilterKind.SplitWords => new SplitWordsFilter<T>(query, filter),

            _ => throw new NotSupportedException(),
        };
    }
}
