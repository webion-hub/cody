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


        [HttpPost]
        [Route("create_new")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateNew([FromBody] SchoolCreationRequest request)
        {
            SchoolAccount school = request;
            if (SchoolExists(school, out var existingSchool))
                return BadRequest(existingSchool.Id);

            school.State = new SchoolAccountState {
                HasBeenVerified = false,
            };

            await _context.Schools.AddAsync(school);
            await _context.SaveChangesAsync();

            _logger.LogInformation("School created - {School}", school);
            return Ok(school.Id);
        }


        private bool SchoolExists(SchoolAccount school, out SchoolAccount existingSchool)
        {
            var maybeExisting =
                from s in _context.Schools
                where
                    s.Name == school.Name &&
                    s.City == school.City &&
                    s.Country == school.Country
                select s;

            existingSchool = maybeExisting.FirstOrDefault();
            return maybeExisting.Any();
        }


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
