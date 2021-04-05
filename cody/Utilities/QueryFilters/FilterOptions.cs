using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class FilterOptions<T>
    {
        public Func<RequestedProperty, Expression<Func<T, bool>>> OnNotNull { get; init; } = _ => _ => false;
        public Func<RequestedProperty, Expression<Func<T, bool>>> OnMatchExact { get; init; } = _ => _ => false;
        public FilterGenerator<T> OnDefault { get; init; } = _ => _ => false;


        public FilterGenerator<T> AsFilterGenerator()
        {
            return k => k.RequestedProperty.IsRequested
                ? k.RequestedProperty.MustNotBeNull
                    ? OnNotNull(k.RequestedProperty)
                    : OnMatchExact(k.RequestedProperty)
                : OnDefault(k);
        }
    }
}
