using Cody.Models;
using Cody.Utilities;
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
        string Country,
        string Description,
        string Website
    ) {
        private OrganizationKind _organizationKind;


        public bool Validate()
        {
            var kind = Utility.MaybeGetEnumFrom<OrganizationKind>(Kind);
            if (kind is null)
                return false;

            _organizationKind = kind.Value;
            return 
                !string.IsNullOrWhiteSpace(Name) &&
                Description.Length <= OrganizationDetail.MAX_DESCRIPTION_LENGTH;
        }


        public Organization AsOrganization()
        {
            return new Organization
            {
                Name = Name.Trim(),
                Kind = _organizationKind,
                Detail = new (){
                    City = City?.Trim(),
                    Country = Country?.Trim(),
                    Description = Description?.Trim(),
                    Website = Website?.Trim(),
                },
                State = new (){
                    HasBeenVerified = false,
                },
            };
        }
    }
}
