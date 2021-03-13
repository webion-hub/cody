using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Attributes
{
    public class NameOrSurnameAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is not string nameOrSurname)
                return true;

            return FieldValidation.IsValidNameOrSurname(nameOrSurname);
        }
    }
}
