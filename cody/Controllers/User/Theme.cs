using Cody.Extensions;
using Cody.Db.Models;
using Cody.Db.Models.Users;
using Cody.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    public partial class UserController
    {
        [HttpGet("theme")]
        [Authorize]
        public async Task<IActionResult> GetTheme()
        {
            var detail = await GetAccountDetailAsync();
            var result = detail.PreferredTheme?.Color.ToString();

            return Ok(result);
        }


        [HttpPut("theme/{color}")]
        [Authorize]
        public async Task<IActionResult> SetTheme(string color) 
        {
            var newColor = Utility.MaybeGetEnumFrom<ThemeColor>(color);
            if (newColor is null)
                return BadRequest();

            var detail = await GetAccountDetailAsync();
            detail.PreferredTheme ??= new();
            detail.PreferredTheme.Color = newColor.Value;

            _dbContext.Update(detail);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }


        private async Task<UserAccountDetail> GetAccountDetailAsync()
        {
            var user = await HttpContext.GetLoggedUserAsync();
            await _dbContext
                .Entry(user.AccountDetail)
                .Reference(ad => ad.PreferredTheme)
                .LoadAsync();

            return user.AccountDetail;
        }
    }
}
