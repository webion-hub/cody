using Cody.Contexts;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    [Route("admin/users")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public partial class UsersController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public UsersController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }

    }
}
