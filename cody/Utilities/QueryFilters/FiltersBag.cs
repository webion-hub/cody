using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class FiltersBag<T>
    {
        public PropertyFilter<T> OnNotNull { get; set; } = _ => _ => false;
        public PropertyFilter<T> OnMatchExact { get; set; } = _ => _ => false;
        public FilterGenerator<T> OnDefault { get; set; } = _ => _ => false;


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
