using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public class SplitWordsFilter<T> : IQueryFilter<T>
    {
        private readonly IQueryable<T> _query;
        private readonly IEnumerable<string> _searchTerms;


        public SplitWordsFilter(IQueryable<T> query, string searchTerms)
            : this(query, searchTerms.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        { }

        public SplitWordsFilter(IQueryable<T> query, IEnumerable<string> searchTerms)
        {
            _query = query;
            _searchTerms = searchTerms;
        }


        public IQueryable<T> FilterUsing(FilterGenerator<T> filterGenerator)
        {
            IQueryable<T> result = _query;
            foreach (var st in _searchTerms)
                result = result.Where(filterGenerator(st));

            return result;
        }
    }
}
