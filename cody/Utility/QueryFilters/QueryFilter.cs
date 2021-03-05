using Cody.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public delegate Expression<Func<T, bool>> FilterGenerator<T>(SearchTerm searchTerm);


    public abstract class QueryFilter<T>
    {
        public abstract IQueryable<T> Where(FilterGenerator<T> generator);

        protected static Expression<Func<T, bool>> GenerateFilter(
            FilterGenerator<T> generator, 
            SearchTerm searchTerm
        ) {
            var filter = generator(searchTerm);
            return searchTerm.IsExcluded
                ? filter.Negate()
                : filter;
        }
    }
}
