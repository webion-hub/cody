using cody.Contexts;
using cody.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Controllers
{
    [ApiController]
    [Route("school")]
    public class SchoolController : ControllerBase
    {
        private readonly CodyContext _context;

        public SchoolController(CodyContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("create_new")]
        public async Task<IActionResult> CreateNew([FromBody] SchoolAccount school)
        {
            var maybeExisting =
                from s in _context.Schools
                where
                    s.Name == school.Name &&
                    s.City == school.City &&
                    s.Country == school.Country
                select s;

            if (maybeExisting.Any())
                return BadRequest(maybeExisting.First().Id);

            await _context.Schools.AddAsync(school);
            await _context.SaveChangesAsync();
            return Ok(school.Id);
        }


        [HttpGet]
        [Route("get_all")]
        public IActionResult GetAll()
        {
            return Ok(_context.Schools);
        }
    }
}
