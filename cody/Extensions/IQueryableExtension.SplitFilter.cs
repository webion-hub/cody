using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public class SplitFilter<T>
    {
        private readonly IQueryable<T> _query;
        private readonly IEnumerable<string> _searchTerms;

        public SplitFilter(IQueryable<T> query, IEnumerable<string> searchTerms)
        {
            _query = query;
            _searchTerms = searchTerms;
        }


        public delegate Expression<Func<T, bool>> FilterGenerator(string searchTerm);

        public IQueryable<T> FilterUsing(FilterGenerator filterGenerator)
        {
            IQueryable<T> result = _query;
            foreach (var st in _searchTerms)
                result = result.Where(filterGenerator(st));

            return result;
        }
    }
}
