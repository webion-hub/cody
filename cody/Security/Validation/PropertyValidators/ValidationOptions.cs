using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public record ValidationOptions
    {
        public static ValidationOptions NotNull => new ValidationOptions {
            CanBeNull = false,
            ReturnTrueIfNull = false,
        };

        public static ValidationOptions SkipNullValidation => new ValidationOptions {
            CanBeNull = true,
            ReturnTrueIfNull = false,
        };

        public bool CanBeNull { get; init; }
        public bool ReturnTrueIfNull { get; init; }
    }
}
