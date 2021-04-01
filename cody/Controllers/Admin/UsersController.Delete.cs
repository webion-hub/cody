using Cody.QueryExtensions;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Cody.Controllers.Admin
{
    public partial class UsersController
    {
        [HttpDelete("{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Delete(int id) => await DeleteOrRestoreAsync(id, isDeleted: true);

        [HttpPatch("restore/{id}")]
        [Authorize(Roles = Roles.Admin)]
        public async Task<IActionResult> Restore(int id) => await DeleteOrRestoreAsync(id, isDeleted: false);


        private async Task<IActionResult> DeleteOrRestoreAsync(int userId, bool isDeleted)
        {
            var user = await _dbContext
                .UserAccounts
                .IncludingState()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
                return NotFound();

            user.AccountState.HasBeenDeleted = isDeleted;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
