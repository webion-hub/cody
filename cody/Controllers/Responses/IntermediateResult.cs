using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    internal record IntermediateResult(
        bool HasError,
        IActionResult Error
    ) {
        public static IntermediateResult Ok => new IntermediateResult(false, null);
    }
}
