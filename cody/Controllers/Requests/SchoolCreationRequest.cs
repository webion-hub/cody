using Cody.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record OrganizationCreationRequest (
        string Name,
        string Kind,
        string City,
        string Country
    ) {
        public static implicit operator Organization(OrganizationCreationRequest self)
        {
            return new Organization
            {
                Name = self.Name.Trim(),
                Kind = (OrganizationKind)Enum.Parse(typeof(OrganizationKind), self.Kind),
                Detail = new (){
                    City = self.City.Trim(),
                    Country = self.City.Trim(),
                },
                State = new (){
                    HasBeenVerified = false,
                },
            };
        }
    }
}
