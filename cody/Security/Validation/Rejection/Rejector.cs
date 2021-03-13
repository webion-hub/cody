using Cody.Security.Validation.PropertyValidators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Rejection
{
    public class Rejector
    {
        public static RejectionResult MaybeReject(ValidatorsBag validatorsBag)
        {
            var result = validatorsBag
                .Validators
                .Where(v => !v.Validate())
                .Select(v => v.PropertyName);

            return new(result);
        }
    }
}
