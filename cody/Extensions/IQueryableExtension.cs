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


        public static SplitFilter<T> SplitFilter<T>(
            this IQueryable<T> self, 
            string filter
        ) => SplitFilter(self, filter.Split(' ', StringSplitOptions.RemoveEmptyEntries));

        public static SplitFilter<T> SplitFilter<T>(
            this IQueryable<T> self, 
            IEnumerable<string> searchTerms
        ) {
            return new SplitFilter<T>(self, searchTerms);
        }
    }
}
