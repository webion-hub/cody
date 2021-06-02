using Cody.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    [Route("api/cities")]
    [ApiController]
    [AllowAnonymous]
    public class CitiesSearchController : ControllerBase
    {
        private readonly BingMapsService _bingMaps;

        public CitiesSearchController(BingMapsService bingMaps)
        {
            _bingMaps = bingMaps;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromQuery] string name)
        {
            var results = 
                await _bingMaps.SearchLocationAsync(name);
            
            return Ok(results);
        }
    }
}