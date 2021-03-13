using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public class PropertyValidator 
    {
        public string PropertyName { get; init; }
        public string PropertyValue { get; init; }
        public Func<bool> Predicate { get; init; }
        public ValidationOptions? Options { get; init; }


        public PropertyValidator(
            string propertyName,
            string propertyValue,
            Func<bool> predicate,
            ValidationOptions? options = default
        ) {
            PropertyName = propertyName;
            PropertyValue = propertyValue;
            Predicate = predicate;
            Options = options;
        }


        public bool Validate()
        {
            if (string.IsNullOrWhiteSpace(PropertyValue))
                return Options?.CanBeNull is null or true;

            return Predicate();
        }
    }
}
