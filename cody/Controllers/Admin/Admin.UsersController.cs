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
    [Route("Admin/Users")]
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
        public async Task<IActionResult> Get()
        {
            var detailedUsersQuery =
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

                select new {
                    userAccount.Id,
                    userAccount.Username,
                    userAccount.Email,
                    Detail = new {
                        accountDetail.Name,
                        accountDetail.Surname,
                        accountDetail.BirthDate,
                    },
                    ProfilePicture = upp == null ? null : new {
                        upp.FilePath,
                    },
                    School = sa == null ? null : new {
                        sa.Id,
                        sa.Name,
                        sa.City,
                        sa.Country,
                    },
                };

            var detailedUsers = await detailedUsersQuery.ToListAsync();
            return new JsonResult(detailedUsers, new JsonSerializerOptions
            {
                WriteIndented = true,
            });
        }
    }
}
