using Cody.Extensions;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public delegate Expression<Func<T, bool>> FilterGenerator<T>(Keyword keyword);


    public abstract class QueryFilter<T>
    {
        protected readonly IQueryable<T> _query;
        protected readonly IEnumerable<Keyword> _keywords;


        protected QueryFilter(IQueryable<T> query, Keyword keyword)
            : this(query, new[] { keyword })
        { }

        protected QueryFilter(IQueryable<T> query, IEnumerable<Keyword> keywords)
        {
            _query = query;
            _keywords = keywords;
        }


        public virtual IQueryable<T> Where(FilterGenerator<T> generator)
        {
            var result = _query;
            foreach (var k in _keywords)
            {
                result = ApplyFilter(
                    generator: generator,
                    query: result,
                    keyword: k
                );
            }

            return result;
        }


        protected static IQueryable<T> ApplyFilter(FilterGenerator<T> generator, IQueryable<T> query, Keyword keyword)
        {
            var filter = generator(keyword);
            return keyword.ExcludeFromSearch
                ? query.Except(query.Where(filter))
                : query.Where(filter);
        }
    }
}
