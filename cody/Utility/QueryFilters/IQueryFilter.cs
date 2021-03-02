using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public delegate Expression<Func<T, bool>> FilterGenerator<T>(SearchTerm searchTerm);


    public interface IQueryFilter<T>
    {
        public IQueryable<T> FilterUsing(FilterGenerator<T> generator);
    }
}
