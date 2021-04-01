using Cody.Contexts;
using Cody.Security;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Cody.Extensions;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Cody.Models;
using Cody.Utilities.QueryFilters;
using Cody.QueryExtensions;

namespace Cody.Controllers.Admin
{
    public partial class UsersController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Get(
            [FromQuery] string filter,
            [FromQuery] int? limit, 
            [FromQuery] int? offset
        ) {
            var response = await SearchResult.FormatAsync(
                results: GetFilteredUsers(filter),
                limit: limit,
                offset: offset
            );
            
            return Ok(response);
        }


        private IQueryable<object> GetFilteredUsers(string filter)
        {
            return _dbContext
                .UserAccounts
                .IncludingDetail()
                .IncludingProfilePicture()
                .IncludingState()
                .IncludingOrganizations()

                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .FormatFor(null);
        }
    }
}
