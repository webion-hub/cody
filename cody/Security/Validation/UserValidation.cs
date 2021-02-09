using Cody.Contexts;
using Cody.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Validation
{
    public abstract class UserValidation
    {
        protected readonly CodyContext _dbContext;
        protected List<string> _rejectReasons;

        public IReadOnlyCollection<string> RejectReasons => _rejectReasons.AsReadOnly();
        public bool WasRejected => _rejectReasons.Any();
        public IActionResult StatusCode => WasRejected
            ? new ConflictObjectResult(RejectReasons)
            : new OkResult();


        public UserValidation(CodyContext dbContext)
        {
            _dbContext = dbContext;
            _rejectReasons = new();
        }



        public UserValidation Validate(UserAccount user)
        {
            MaybeReject(user);
            return this;
        }


        protected virtual void MaybeReject(UserAccount user)
        {
            var rejectReasons = new List<string>();
            rejectReasons.AddRange(user.GetRejectReasons());
            rejectReasons.AddRange(user.AccountDetail?.GetRejectReasons());

            _rejectReasons = rejectReasons;
        }
    }
}
