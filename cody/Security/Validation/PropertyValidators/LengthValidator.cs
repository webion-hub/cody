using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public class LengthValidator : PropertyValidator
    {
        public LengthValidator(
            string propertyName,
            string propertyValue,
            Predicate<int?> predicate,
            ValidationOptions? options = default
        ) : base(
            propertyName,
            propertyValue,
            () => predicate(propertyValue?.Length),
            options
        ) { }


        public LengthValidator(
            string propertyName,
            string propertyValue,
            int? minimumLength,
            int? maximumLength,
            ValidationOptions? options = default
        ) : base(
            propertyName, 
            propertyValue, 
            () => IsLengthWithin(propertyValue?.Length, minimumLength, maximumLength),
            options
        ) { }


        private static bool IsLengthWithin(int? length, int? min, int? max)
        {
            return 
                length >= (min ?? FieldLength.DefaultMinLength) && 
                length <= (max ?? FieldLength.DefaultMaxLength);
        }
    }
}
