using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class ExpressionExtension
    {
        public static Expression<TFunc> Negate<TFunc>(this Expression<TFunc> self)
        {
            var param = self.Parameters;
            var body = Expression.Not(self.Body);
            
            return Expression.Lambda<TFunc>(body, param);
        }
    }
}
