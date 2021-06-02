using Cody.Db;
using Cody.Db.Models.Users;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

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
            _rejectReasons = new List<string>();
        }
    }
}
