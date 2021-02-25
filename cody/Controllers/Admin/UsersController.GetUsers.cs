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

            var users = await GetUsers(filter)
                .Skip(offset ?? 0)
                .MaybeTake(limit)
                .ToListAsync();

            return Ok(users);
        }


        private IQueryable<object> GetUsers(string filter)
        {
            var query =
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
                select new
                {
                    userAccount.Id,
                    userAccount.Username,
                    userAccount.Email,
                    Detail = new
                    {
                        accountDetail.Name,
                        accountDetail.Surname,
                        accountDetail.BirthDate,
                    },
                    ProfilePicture = upp == null ? null : new
                    {
                        upp.FilePath,
                    },
                    School = sa == null ? null : new
                    {
                        sa.Id,
                        sa.Name,
                        sa.City,
                        sa.Country,
                    },
                };

            if (filter is null)
                return query;

            var isFilterADate = 
                DateTime.TryParse(filter, out var dateFilter);

            if (isFilterADate)
                return query.Where(u => u.Detail.BirthDate == dateFilter);

            return query.Where(u =>
                Regex.IsMatch(u.Id.ToString(), filter) ||
                Regex.IsMatch(u.Username, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.Email, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.Detail.Name, filter, RegexOptions.IgnoreCase) ||
                Regex.IsMatch(u.Detail.Surname, filter, RegexOptions.IgnoreCase)
            );
        }
    }
}
