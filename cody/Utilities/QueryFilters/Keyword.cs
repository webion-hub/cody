using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Utilities.QueryFilters
{
    public class Keyword
    {
        public string Value { get; init; }
        public string Pattern { get; init; }
        public bool ExcludeFromSearch { get; init; }

        public RequestedProperty RequestedProperty => _requestedProperty.Value;
        public Lazy<RequestedProperty> _requestedProperty;

        public Lazy<DateTime> Date { get; init; }
        public bool IsDate { get; private set; }


        public static Keyword From(string rawValue) => new(rawValue);

        public Keyword(string rawValue)
        {
            ExcludeFromSearch = rawValue.StartsWith('-');
            Value = ExcludeFromSearch 
                ? rawValue[1..]
                : rawValue;

            _requestedProperty = new(() => new(Value));
            Pattern = Regex.Escape(Value);
            Date = new(LoadDate);
        }


        private DateTime LoadDate()
        {
            IsDate = DateTime.TryParse(Value, out var result);
            return result;
        }

        public T? AsEnum<T>() where T: struct => Utility.MaybeGetEnumFrom<T>(Value);


        public static implicit operator string (Keyword self) => self.Value;
        public static implicit operator DateTime (Keyword self) => self.Date.Value;
    }
}
