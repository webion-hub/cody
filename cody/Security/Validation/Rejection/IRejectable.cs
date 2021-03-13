using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation.Rejection
{
    public interface IRejectable
    {
        public RejectionResult MaybeReject();
    }
}
