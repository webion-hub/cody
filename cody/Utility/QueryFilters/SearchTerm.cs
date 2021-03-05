using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utility.QueryFilters
{
    public struct SearchTerm
    {
        public string Value { get; init; }
        public bool IsExcluded { get; init; }

        private readonly DateTime _dateValue;
        public DateTime DateValue => _dateValue;
        public bool IsDate { get; init; }


        public static SearchTerm From(string rawValue) => new(rawValue);

        public SearchTerm(string rawValue)
        {
            IsExcluded = rawValue.StartsWith('-');
            Value = IsExcluded ? rawValue[1..] : rawValue;
            IsDate = DateTime.TryParse(rawValue, out _dateValue);
        }


        public static implicit operator string (SearchTerm self) => self.Value;
        public static implicit operator DateTime (SearchTerm self) => self.DateValue;
    }
}
