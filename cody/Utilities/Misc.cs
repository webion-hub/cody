using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Utilities
{
    public static class Misc
    {
        public static void TrimAll<T>(T target, params Expression<Func<T, string>>[] expressions)
        {
            foreach (var expression in expressions)
            {
                var expr = (MemberExpression)expression.Body;
                var prop = (PropertyInfo)expr.Member;

                var trimmedValue = prop
                    .GetValue(target)
                    .ToString()
                    .Trim();

                prop.SetValue(target, trimmedValue);
            }
        }


        public static T? MaybeGetEnumFrom<T>(string value) where T : struct
        {
            if (typeof(T).IsEnum is not true)
                throw new ArgumentException($"{nameof(T)} must be an enum");

            return Enum.TryParse(typeof(T), value, out var result)
                ? (T)result
                : null;
        }
    }
}
