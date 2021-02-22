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
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    [Route("admin/users")]
    [ApiController]
    [Authorize(Roles = Roles.Admin)]
    public class UsersController : ControllerBase
    {
        private readonly CodyContext _dbContext;

        public UsersController(CodyContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get(
            [FromQuery] int? limit, 
            [FromQuery] int? offset
        ) {
            var areQueryValuesNegative =
                limit.HasValue && limit.Value is < 0 ||
                offset.HasValue && offset.Value is < 0;

            if (areQueryValuesNegative)
                return BadRequest();

            var users = GetUsers(limit, offset);
            var detailedUsers = await users.ToListAsync();

            return new JsonResult(detailedUsers, new JsonSerializerOptions
            {
                WriteIndented = true,
            });
        }


        private IQueryable<object> GetUsers(int? limit, int? offset)
        {
            var usersQuery = GetDetailedUsersQuery();
            var users = usersQuery.Skip(offset ?? 0);

            if (limit is not null)
                users = usersQuery.Take(limit.Value);

            return users;
        }

        private IQueryable<object> GetDetailedUsersQuery()
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
        }
    }
}
