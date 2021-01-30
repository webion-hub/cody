using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record SchoolCreationRequest (
        string Name,
        string City,
        string Country
    ) {
        public static implicit operator SchoolAccount(SchoolCreationRequest self)
        {
            return new SchoolAccount
            {
                Name = self.Name.Trim(),
                City = self.City.Trim(),
                Country = self.City.Trim(),
            };
        }
    }
}
