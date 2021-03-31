using Cody.Extensions;
using Cody.Models;
using Cody.QueryExtensions;
using Cody.Utilities.QueryFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class UserController
    {
        [HttpGet("joined_organizations")]
        [Authorize]
        public async Task<IActionResult> GetJoinedOrganizations(
            [FromQuery] string filter,
            [FromQuery] int? limit,
            [FromQuery] int? offset
        ) {
            var organizations = GetUserOrganizations(filter);
            var result = await SearchResult.FormatAsync(
                results: organizations,
                limit: limit,
                offset: offset
            );

            return Ok(result);
        }


        private IQueryable<object> GetUserOrganizations(string filter)
        {
            var userId = HttpContext.User.GetId();
            return _dbContext
                .OrganizationMembers
                .IncludingOrganization().WithState()
                .IncludingOrganization().WithLogo()

                .Where(om => om.UserAccountId == userId)
                .Select(om => om.Organization)
                
                .ThatHaveNotBeenDeleted()
                .CreateFilter(filter, FilterKind.SplitWords)
                .DefaultMatch()
                .OrderBy(o => o.Id)
                .Select(o => new
                {
                    o.Id,
                    o.Name,
                    State = new {
                        o.State.HasBeenVerified,
                    },
                    Kind = o.Kind.ToString(),
                    HasLogo = o.Detail.Logo != null,
                });
        }
    }
}
