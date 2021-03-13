using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public class StringValidator : PropertyValidator
    {
        public StringValidator(
            string propertyName,
            string propertyValue,
            Predicate<string> predicate,
            ValidationOptions? options = default
        ) : base(
            propertyName,
            propertyValue,
            () => predicate(propertyValue),
            options
        ) { }
    }
}
