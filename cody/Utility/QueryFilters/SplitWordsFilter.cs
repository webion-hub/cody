using Cody.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public class SplitWordsFilter<T> : QueryFilter<T>
    {
        private readonly IQueryable<T> _query;
        private readonly IEnumerable<SearchTerm> _searchTerms;


        public SplitWordsFilter(IQueryable<T> query, string filter)
            : this(query, filter.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        { }

        public SplitWordsFilter(IQueryable<T> query, IEnumerable<string> filters)
        {
            _query = query;
            _searchTerms = filters.Select(f => SearchTerm.From(f));
        }
        

        public override IQueryable<T> Where(FilterGenerator<T> filterGenerator)
        {
            var result = _query;
            foreach (var st in _searchTerms)
            {
                var filter = 
                    GenerateFilter(filterGenerator, st);

                result = result.Where(filter);
            }

            return result;
        }
    }
}
