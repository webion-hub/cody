using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [ApiController]
    [Route("school")]
    [Authorize]
    public partial class SchoolController : ControllerBase
    {
        private readonly ILogger<SchoolController> _logger;
        private readonly CodyContext _context;

        public SchoolController(ILogger<SchoolController> logger, CodyContext context)
        {
            _logger = logger;
            _context = context;
        }
    }
}
