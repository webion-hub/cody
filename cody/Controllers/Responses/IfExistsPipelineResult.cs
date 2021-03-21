using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    public record IfExistsPipelineResult<T>(
        bool Exists,
        T Value
    ) {
        public static implicit operator IfExistsPipelineResult<T>((bool, T) pair) => new(pair.Item1, pair.Item2);
    }
}
