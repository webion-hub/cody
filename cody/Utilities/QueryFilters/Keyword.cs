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


        private readonly Lazy<DateTime> _dateValue;
        public DateTime DateValue => _dateValue.Value;
        public bool IsDate { get; private set; }


        public static Keyword From(string rawValue) => new(rawValue);

        public Keyword(string rawValue)
        {
            ExcludeFromSearch = rawValue.StartsWith('-');
            Value = ExcludeFromSearch ? rawValue[1..] : rawValue;
            Pattern = Regex.Escape(Value);

            _dateValue = new(() => {
                IsDate = DateTime.TryParse(rawValue, out var result);
                return result;
            });
        }


        public T? AsEnum<T>() where T: struct => Utility.MaybeGetEnumFrom<T>(Value);


        public static implicit operator string (Keyword self) => self.Value;
        public static implicit operator DateTime (Keyword self) => self.DateValue;
    }
}
