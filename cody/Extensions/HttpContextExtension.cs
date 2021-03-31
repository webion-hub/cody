using Cody.Models.Organizations;
using Cody.Models.Users;
using Cody.Security.Authentication;
using Cody.Security.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class HttpContextExtension
    {
        public static async Task SignInAsync(this HttpContext context, UserAccount user)
        {
            await context.SignInAsync(
                scheme: LoginManager.DEFAULT_SCHEME,
                principal: LoginManager.GetPrincipalFor(user),
                properties: LoginManager.DefaultAuthProperties
            );
        }


        public static async Task<bool> IsUserOwnerOfAsync(this HttpContext context, Organization organization)
        {
            var dbContext = context
                .RequestServices
                .GetCodyContext();

            return await dbContext.IsUserOwnerOfAsync(
                new() { Id = context.User.GetId() },
                organization
            );
        }


        public static async Task<bool> IsUserInRoleAsync(this HttpContext context, string role)
        {
            var user = 
                await context.GetLoggedUserAsync();
            
            return RolesManager.IsUserInRole(user, role);
        }


        public static Task<UserAccount> GetLoggedUserAsync(this HttpContext context)
        {
            var dbContext = context
                .RequestServices
                .GetCodyContext();

            return context.User.FetchFromDbAsync(dbContext);
        }
    }
}
