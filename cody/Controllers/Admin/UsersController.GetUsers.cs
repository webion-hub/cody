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
using Cody.Utility.QueryFilters;

namespace Cody.Controllers.Admin
{
    public partial class UsersController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult Get(
            [FromQuery] string filter,
            [FromQuery] int? limit, 
            [FromQuery] int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return BadRequest();

            var users = GetFilteredUsers(filter)
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return Ok(users);
        }


        private IQueryable<object> GetFilteredUsers(string filter)
        {
            var users = GetAllUsers();
            var filteredUsers = FilterUsers(users, filter);

            return
                from u in filteredUsers
                let ad = u.AccountDetail
                let o = u.Organizations
                let pp = ad.ProfilePicture

                select new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    Organizations = o.Select(o => new
                    {
                        o.Organization.Id,
                        o.Organization.Name,
                        Kind = o.Organization.Kind.ToString(),
                    }),
                    Detail = new
                    {
                        ad.Name,
                        ad.Surname,
                        ad.BirthDate,
                        ad.RegistrationDate,
                    },
                    ProfilePicture = pp == null ? null : new
                    {
                        pp.FilePath,
                    },
                };
        }


        private IQueryable<UserAccount> GetAllUsers()
        {
            return _dbContext
                .UserAccounts
                .Include(u => u.AccountDetail)
                    .ThenInclude(ad => ad.ProfilePicture)
                .Include(u => u.Organizations)
                .OrderBy(u => u.Id);
        }


        private static IQueryable<UserAccount> FilterUsers(IQueryable<UserAccount> users, string filter)
        {
            if (string.IsNullOrWhiteSpace(filter))
                return users;

            return users
                .CreateFilter(filter, FilterKind.SplitWords)
                .Where(k => u => 
                    u.AccountDetail.BirthDate == k ||
                    u.AccountDetail.RegistrationDate == k ||

                    Regex.IsMatch(u.Id.ToString(), k.Pattern) ||
                    Regex.IsMatch(u.Username, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.Email, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.AccountDetail.Name, k.Pattern, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.AccountDetail.Surname, k.Pattern, RegexOptions.IgnoreCase)
                );
        }
    }
}
