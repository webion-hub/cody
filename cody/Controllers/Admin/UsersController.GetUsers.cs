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
                let pp = ad.ProfilePicture
                let s = ad.School

                select new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    Detail = new
                    {
                        ad.Name,
                        ad.Surname,
                        ad.BirthDate,
                    },
                    ProfilePicture = pp == null ? null : new
                    {
                        pp.FilePath,
                    },
                    School = s == null ? null : new
                    {
                        s.Id,
                        s.Name,
                        s.City,
                        s.Country,
                    },
                };
        }


        private IQueryable<UserAccount> GetAllUsers()
        {
            return _dbContext
                .UserAccounts
                .Include(u => u.AccountDetail)
                    .ThenInclude(ad => ad.ProfilePicture)
                .Include(u => u.AccountDetail)
                    .ThenInclude(ad => ad.School)
                .OrderBy(u => u.Id);
        }


        private static IQueryable<UserAccount> FilterUsers(IQueryable<UserAccount> users, string filter)
        {
            if (string.IsNullOrWhiteSpace(filter))
                return users;

            var isFilterADate =
                DateTime.TryParse(filter, out var dateFilter);

            return users
                .BeginSplitSearch(filter)
                .ExecuteWith(st => u => 
                    isFilterADate ? u.AccountDetail.BirthDate == dateFilter : false ||

                    Regex.IsMatch(u.Id.ToString(), st) ||
                    Regex.IsMatch(u.Username, st, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.Email, st, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.AccountDetail.Name, st, RegexOptions.IgnoreCase) ||
                    Regex.IsMatch(u.AccountDetail.Surname, st, RegexOptions.IgnoreCase)
                );
        }
    }
}
