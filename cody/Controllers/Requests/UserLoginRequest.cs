using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record UserLoginRequest(
        [Required, DefaultUsernameLength] 
        string Username,
        
        [Required, DefaultPasswordLength] 
        string Password,
        bool? RememberMe
    );
}
