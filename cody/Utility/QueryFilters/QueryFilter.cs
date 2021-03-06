using Cody.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public delegate Expression<Func<T, bool>> FilterGenerator<T>(Keyword keyword);


    public abstract class QueryFilter<T>
    {
        public abstract IQueryable<T> Where(FilterGenerator<T> generator);


        protected static IQueryable<T> ApplyFilter(FilterGenerator<T> generator, IQueryable<T> query, Keyword keyword)
        {
            var filter = generator(keyword);
            return keyword.ExcludeFromSearch
                ? query.Except(query.Where(filter))
                : query.Where(filter);
        }
    }
}
