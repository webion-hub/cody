using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class IQueryableExtension
    {
        public static IQueryable<T> MaybeTake<T>(this IQueryable<T> self, int? amount)
        {
            return amount.HasValue
                ? self.Take(amount.Value)
                : self;
        }


        public static SplitSearch<T> BeginSplitSearch<T>(
            this IQueryable<T> self, 
            string filter
        ) => BeginSplitSearch(self, filter.Split(' ', StringSplitOptions.RemoveEmptyEntries));

        public static SplitSearch<T> BeginSplitSearch<T>(
            this IQueryable<T> self, 
            IEnumerable<string> searchTerms
        ) {
            return new SplitSearch<T>(self, searchTerms);
        }
    }
}
