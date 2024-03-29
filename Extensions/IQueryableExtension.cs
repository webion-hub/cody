﻿using Cody.Db.QueryFilters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class IQueryableExtension
    {
        public static IQueryable<T> MaybeTake<T>(this IQueryable<T> self, int? amount)
        {
            return amount.HasValue
                ? self.Take(amount.Value)
                : self;
        }


        public static QueryFilter<T> CreateFilter<T>(this IQueryable<T> self, string filter, FilterKind kind) 
        {
            return QueryFilterFactory.CreateNew(self, filter, kind);
        }
    }
}
