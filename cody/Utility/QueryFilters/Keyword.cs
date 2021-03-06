using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public struct Keyword
    {
        public string Value { get; init; }
        public bool IsExcluded { get; init; }


        private readonly DateTime _dateValue;
        public DateTime DateValue => _dateValue;
        public bool IsDate { get; init; }


        public static Keyword From(string rawValue) => new(rawValue);

        public Keyword(string rawValue)
        {
            IsExcluded = rawValue.StartsWith('-');
            Value = IsExcluded ? rawValue[1..] : rawValue;
            IsDate = DateTime.TryParse(rawValue, out _dateValue);
        }


        public static implicit operator string (Keyword self) => self.Value;
        public static implicit operator DateTime (Keyword self) => self.DateValue;
    }
}
