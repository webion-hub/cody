using Cody.Models;
using Cody.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public class OrganizationCreationRequest
    {
        private OrganizationKind _organizationKind;

        public string Name { get; set; }
        public string Kind { get; set; }
        public string City { get; set; }
        public string Country { get; set; }


        public OrganizationCreationRequest(
            string name,
            string kind,
            string city,
            string country
        ) {
            Name = name.Trim();
            Kind = kind.Trim();
            City = city.Trim();
            Country = country.Trim();
        }


        public bool IsValid()
        {
            var kind = Utility.MaybeGetEnumFrom<OrganizationKind>(Kind);
            if (kind is null)
                return false;

            _organizationKind = kind.Value;
            return
                !string.IsNullOrWhiteSpace(Name) ||
                !string.IsNullOrWhiteSpace(City) ||
                !string.IsNullOrWhiteSpace(Country);
        }


        public static implicit operator Organization(OrganizationCreationRequest self)
        {
            return new Organization
            {
                Name = self.Name,
                Kind = self._organizationKind,
                Detail = new (){
                    City = self.City,
                    Country = self.City,
                },
                State = new (){
                    HasBeenVerified = false,
                },
            };
        }
    }
}
