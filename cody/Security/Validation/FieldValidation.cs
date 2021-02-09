using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Security.Validation
{
    public class FieldValidation
    {
        public static bool IsValidNameOrSurname(string name)
        {
            return Regex.IsMatch(
                input: name, 
                pattern: @"^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+([ A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]+)*$", 
                options: RegexOptions.None, 
                matchTimeout: TimeSpan.FromMilliseconds(250)
            );
        }

        public static bool IsValidEmail(string email)
        {
            return MailAddress.TryCreate(email, out var _);
        }
    }
}
