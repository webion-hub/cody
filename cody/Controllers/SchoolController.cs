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
    public class SchoolController : ControllerBase
    {
        private readonly ILogger<SchoolController> _logger;
        private readonly CodyContext _context;

        public SchoolController(ILogger<SchoolController> logger, CodyContext context)
        {
            _logger = logger;
            _context = context;
        }


        /// <response code="200">The id of the newly created school</response>
        /// <response code="400">The id of the existing school</response>
        [HttpPost]
        [Route("create_new")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateNew([FromBody] SchoolCreationRequest request)
        {
            if (TryGetSchool(request, out var existingSchool))
                return BadRequest(existingSchool.Id);


            SchoolAccount school = request;
            school.State = new SchoolAccountState {
                HasBeenVerified = false,
            };

            await _context.Schools.AddAsync(school);
            await _context.SaveChangesAsync();

            _logger.LogInformation("School created - {School}", school);
            return Ok(school.Id);
        }


        private bool TryGetSchool(SchoolCreationRequest request, out SchoolAccount school)
        {
            var maybeExisting =
                from s in _context.Schools
                where
                    s.Name == request.Name &&
                    s.City == request.City &&
                    s.Country == request.Country
                select s;

            school = maybeExisting.SingleOrDefault();
            return !maybeExisting.Any();
        }


        /// <response code="200">The list of school accounts</response>
        [HttpGet]
        [Route("get_all")]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            var schools = 
                from s in _context.Schools
                where s.State.HasBeenVerified
                select new {
                    s.Id,
                    s.Name,
                    s.City,
                    s.Country,
                };

            return Ok(schools);
        }
    }
}
