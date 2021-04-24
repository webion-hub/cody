using Cody.Contexts;
using Cody.Security.Authorization;
using Cody.Services.Sftp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    [Route("api/admin/users")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public partial class UsersController : ControllerBase
    {
        private readonly CodyContext _dbContext;
        private readonly SftpService _sftp;

        public UsersController(CodyContext dbContext, SftpService sftp)
        {
            _dbContext = dbContext;
            _sftp = sftp;
        }
    }
}
