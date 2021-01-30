using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record UserLoginRequest(
        string Username,
        string Password,
        bool RememberMe
    );
}
