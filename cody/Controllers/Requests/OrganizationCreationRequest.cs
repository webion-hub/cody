﻿using Cody.Models;
using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.PropertyValidators;
using Cody.Security.Validation.Rejection;
using Cody.Utilities;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record OrganizationCreationRequest (
        [Required, DefaultUsernameLength]
        string Name,
        
        [Required, EnumDataType(typeof(OrganizationKind))]
        string Kind,

        [DefaultMaxLength] string City,
        [DefaultMaxLength] string Country,
        [DefaultDescriptionLength] string Description,

        [Url, DefaultMaxLength]
        string Website
    ) {
        public Organization AsOrganization() => new Organization
        {
            Name = Name.Trim(),
            Kind = Utility.MaybeGetEnumFrom<OrganizationKind>(Kind).Value,
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
