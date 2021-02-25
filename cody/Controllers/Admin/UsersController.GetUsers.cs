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
        public async Task<IActionResult> Get(
            [FromQuery] string filter,
            [FromQuery] int? limit, 
            [FromQuery] int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return BadRequest();

            var users = await GetFilteredUsers(filter)
                .Skip(offset ?? 0)
                .MaybeTake(limit)
                .ToListAsync();

            return Ok(users);
        }


        private IQueryable<object> GetFilteredUsers(string filter)
        {
            var users = GetAllUsers();
            var filteredUsers = FilterUsers(users, filter);

            return
                from u in filteredUsers
                let ad = u.AccountDetail
                let pp = u.AccountDetail.ProfilePicture
                let s = u.AccountDetail.School

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


        private static IQueryable<UserAccount> FilterUsers(IQueryable<UserAccount> users, string filter)
        {
            if (filter is null)
                return users;

            var isFilterADate =
                DateTime.TryParse(filter, out var dateFilter);

            return users.Where(u =>
                isFilterADate ? u.AccountDetail.BirthDate == dateFilter : false ||

                Regex.IsMatch(u.Id.ToString(), filter) ||
                Regex.IsMatch(u.Username, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.Email, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.AccountDetail.Name, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.AccountDetail.Surname, filter, RegexOptions.IgnoreCase)
            );
        }


        private IQueryable<UserAccount> GetAllUsers()
        {
            return
                from userAccount in _dbContext.UserAccounts

                join accountDetail in _dbContext.UserDetails
                on userAccount.Id equals accountDetail.UserAccountId

                join profilePicture in _dbContext.ProfilePictures
                on accountDetail.Id equals profilePicture.AccountDetailId
                into profilePics
                from upp in profilePics.DefaultIfEmpty()

                join school in _dbContext.Schools
                on accountDetail.SchoolId equals school.Id
                into schools
                from sa in schools.DefaultIfEmpty()

                orderby userAccount.Id ascending
                select userAccount;
        }
    }
}
