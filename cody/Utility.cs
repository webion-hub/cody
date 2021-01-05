﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace cody
{
    public static class Utility
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
    }
}