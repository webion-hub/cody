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
    public delegate Expression<Func<T, bool>> PropertyFilter<T>(RequestedProperty rp);


    public abstract class QueryFilter<T>
    {
        protected readonly IQueryable<T> _query;
        protected readonly IEnumerable<Keyword> _keywords;
        protected readonly Lazy<FiltersBag<T>> _filtersBag;


        protected QueryFilter(IQueryable<T> query, Keyword keyword)
            : this(query, new[] { keyword })
        { }

        protected QueryFilter(IQueryable<T> query, IEnumerable<Keyword> keywords)
        {
            _query = query;
            _keywords = keywords;
            _filtersBag = new();
        }



        public QueryFilter<T> OnMatchExact(PropertyFilter<T> expr)
        {
            _filtersBag.Value.OnMatchExact = expr;
            return this;
        }

        public QueryFilter<T> OnNotNull(PropertyFilter<T> expr)
        {
            _filtersBag.Value.OnNotNull = expr;
            return this;
        }

        public QueryFilter<T> OnDefault(FilterGenerator<T> expr)
        {
            _filtersBag.Value.OnDefault = expr;
            return this;
        }


        public IQueryable<T> Filter()
        {
            return Where(_filtersBag.Value.AsFilterGenerator());
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
