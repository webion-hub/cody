using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Attributes
{
    public class DefaultMinMaxLengthAttribute : StringLengthAttribute
    {
        public DefaultMinMaxLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.DefaultMinLength;
        }
    }


    public class DefaultUsernameLength : StringLengthAttribute
    {
        public DefaultUsernameLength()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.UsernameMinLength;
        }
    }


    public class DefaultPasswordLength : StringLengthAttribute
    {
        public DefaultPasswordLength()
            : base(FieldLength.DefaultMaxLength)
        {
            MinimumLength = FieldLength.PasswordMinLength;
        }
    }


    public class DefaultMaxLengthAttribute : MaxLengthAttribute
    {
        public DefaultMaxLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        { }
    }


    public class DefaultDescriptionLengthAttribute : MaxLengthAttribute
    {
        public DefaultDescriptionLengthAttribute()
            : base(FieldLength.DefaultMaxLength)
        { }
    }
}
