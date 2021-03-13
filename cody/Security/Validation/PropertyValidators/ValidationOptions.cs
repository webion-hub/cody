using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public readonly struct ValidationOptions
    {
        public static ValidationOptions NotNull => new ValidationOptions
        {
            CanBeNull = false,
        };


        public bool CanBeNull { get; init; }
    }
}
