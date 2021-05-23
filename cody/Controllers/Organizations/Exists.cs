using Cody.Extensions;
using Cody.Models.Organizations;
using Cody.QueryExtensions;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
  public partial class OrganizationsController : ControllerBase
    {
        [HttpGet("exists/{kind}/{name}/")]
        [AllowAnonymous]
        public async Task<IActionResult> Exists(OrganizationKind kind, string name)
        {
            var exists = await _dbContext
                .Organizations
                .AnyAsync(o => o.Name == name && o.Kind == kind);

            return Ok(exists);
        }
    }
}
