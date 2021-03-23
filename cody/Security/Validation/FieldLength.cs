using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation
{
    internal readonly struct FieldLength
    {
        public const int DefaultMinLength = 4;
        public const int DefaultMaxLength = 256;
        public const int UsernameMinLength = 2;
        public const int PasswordMinLength = 8;
        public const int MaxDescriptionLength = 512;


        public static bool IsValidPasswordLength(int? length) {
            return length is >= PasswordMinLength and <= DefaultMaxLength;
        }

        public static bool IsValidUsernameLength(int? length) {
            return length is >= UsernameMinLength and <= DefaultMaxLength;
        }

        public static bool IsValidDescriptionLength(int? length) {
            return length is <= MaxDescriptionLength;
        }

        public static bool IsWithinDefaultMinMax(int? length) {
            return length is >= DefaultMinLength and <= DefaultMaxLength;
        }

        public static bool IsBelowDefaultMax(int? length) {
            return length is <= DefaultMaxLength;
        }
    }
}
