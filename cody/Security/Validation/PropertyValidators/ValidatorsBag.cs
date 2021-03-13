using Cody.Security.Validation.PropertyValidators;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.PropertyValidators
{
    public class ValidatorsBag : IEnumerable<PropertyValidator>
    {
        public List<PropertyValidator> Validators { get; set; } = new();


        public void Add(LengthValidator v) => Validators.Add(v);
        public void Add(StringValidator v) => Validators.Add(v);

        public void Add(
            string propertyName,
            string propertyValue,
            Func<bool> predicate,
            ValidationOptions? options = default
        ) {
            Validators.Add(new(propertyName, propertyValue, predicate, options));
        }

        public void Add(
            string propertyName,
            string propertyValue,
            Predicate<int?> predicate,
            ValidationOptions? options = default
        ) {
            Validators.Add(new LengthValidator(
                propertyName, propertyValue, predicate, options));
        }

        public void Add(
            string propertyName,
            string propertyValue,
            int? minimumLength,
            int? maximumLength,
            ValidationOptions? options = default
        ) {
            Validators.Add(new LengthValidator(
                propertyName, propertyValue, minimumLength, maximumLength, options));
        }

        public void Add(
            string propertyName,
            string propertyValue,
            Predicate<string> predicate,
            ValidationOptions? options = default
        ) {
            Validators.Add(new StringValidator(
                propertyName, propertyValue, predicate, options));
        }


        public IEnumerator<PropertyValidator> GetEnumerator()
        {
            return ((IEnumerable<PropertyValidator>)Validators).GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)Validators).GetEnumerator();
        }
    }
}
