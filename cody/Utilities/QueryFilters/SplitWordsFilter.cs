using Cody.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class SplitWordsFilter<T> : QueryFilter<T>
    {
        private readonly IQueryable<T> _query;
        private readonly IEnumerable<Keyword> _keywords;


        public SplitWordsFilter(IQueryable<T> query, string filter)
            : this(query, filter.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        { }

        public SplitWordsFilter(IQueryable<T> query, IEnumerable<string> filters)
        {
            _query = query;
            _keywords = filters.Select(f => Keyword.From(f));
        }
        

        public override IQueryable<T> Where(FilterGenerator<T> filterGenerator)
        {
            var result = _query;
            foreach (var k in _keywords)
            {
                result = ApplyFilter(
                    generator: filterGenerator,
                    query: result,
                    keyword: k
                );
            }

            return result;
        }
    }
}
