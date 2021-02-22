using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
