using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class RequestedProperty
    {
        public string Name { get; init; } = null;
        public string Value { get; init; } = null;
        public bool IsRequested =>
            MustNotBeNull || MustMatchExact;


        public bool MustNotBeNull { get; init; } = false;
        public bool MustMatchExact { get; init; } = false;


        public RequestedProperty(string rawValue)
        {
            MustNotBeNull = rawValue.StartsWith('+');

            if (MustNotBeNull) {
                Name = rawValue[1..];
                return;
            }

            var match = Regex.Match(
                input: rawValue, 
                pattern: @"(?<prop_name>[a-z0-9]+)=(?<what>.*)", 
                options: RegexOptions.IgnoreCase
            );

            if (match.Success) {
                MustMatchExact = true;
                Name = match.Groups["prop_name"].Value;
                Value = match.Groups["what"].Value;
            }
        }
    }
}
