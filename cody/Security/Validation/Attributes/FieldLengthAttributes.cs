using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Attributes
{
    internal class DefaultMinMaxLengthAttribute : StringLengthAttribute
    {
        public DefaultMinMaxLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.DefaultMinLength;
        }
    }


    internal class DefaultUsernameLength : StringLengthAttribute
    {
        public DefaultUsernameLength()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.UsernameMinLength;
        }
    }


    internal class DefaultPasswordLength : StringLengthAttribute
    {
        public DefaultPasswordLength()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.PasswordMinLength;
        }
    }


    internal class DefaultMaxLengthAttribute : MaxLengthAttribute
    {
        public DefaultMaxLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        { }
    }


    internal class DefaultDescriptionLengthAttribute : MaxLengthAttribute
    {
        public DefaultDescriptionLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        { }
    }
}
