using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.QueryProviders.Queries
{
    internal abstract class CodyQuery<T> : IQueryable<T> where T: class
    {
        private DbSet<T> _dbSet;
        private IQueryable<T> _query;


        protected CodyQuery(DbSet<T> dbSet)
        {
            _dbSet = dbSet;
            _query = null;
        }


        protected void Include(Func<DbSet<T>, DbSet<T>> transform)
        {
        }

        protected void Chain(Func<IQueryable<T>, IQueryable<T>> transform)
        {
            _query = transform(_query);
        }


        public Type ElementType => _query.ElementType;
        public Expression Expression => _query.Expression;
        public IQueryProvider Provider => _query.Provider;
        public IEnumerator<T> GetEnumerator() => _query.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable)_query).GetEnumerator();
    }
}
