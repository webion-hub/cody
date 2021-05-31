using Cody.Db;
using Cody.Security.Authorization;
using Cody.Services.Sftp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cody.Controllers.Admin
{
    [Route("api/admin/user/{userId}")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public partial class UserController : ControllerBase
    {
        private readonly CodyContext _dbContext;
        private readonly SftpService _sftp;

        public UserController(CodyContext dbContext, SftpService sftp)
        {
            _dbContext = dbContext;
            _sftp = sftp;
        }
    }
}
