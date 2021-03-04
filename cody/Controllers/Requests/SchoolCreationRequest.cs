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
        public static implicit operator Organization(SchoolCreationRequest self)
        {
            return new Organization
            {
                Name = self.Name.Trim(),
                Detail = new (){
                    City = self.City.Trim(),
                    Country = self.City.Trim(),
                },
            };
        }
    }
}
