using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Rejection
{
    public class RejectionResult : IEnumerable<string>
    {
        public IEnumerable<string> RejectedProperties { get; init; }
        public static RejectionResult Empty => new(Enumerable.Empty<string>());


        public RejectionResult(IEnumerable<string> rejectedProperties)
        {
            RejectedProperties = rejectedProperties;
        }


        public RejectionResult IfNoneThenAlongWith(Lazy<IRejectable> rejectable)
        {
            if (RejectedProperties.Any())
                return this;

            return AlongWith(rejectable.Value);
        }

        public RejectionResult AlongWith(IRejectable rejectable)
        {
            if (rejectable is null)
                return this;

            return CombinedWith(rejectable.MaybeReject());
        }


        public RejectionResult CombinedWith(RejectionResult other)
        {
            var result = RejectedProperties
                .Concat(other.RejectedProperties)
                .ToHashSet();

            return new(result);
        }


        public IEnumerator<string> GetEnumerator() => RejectedProperties.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable)RejectedProperties).GetEnumerator();
    }
}
