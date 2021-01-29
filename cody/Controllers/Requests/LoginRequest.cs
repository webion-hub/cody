using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public record LoginRequest(
        string Username,
        string Password,
        bool RememberMe
    );
}
