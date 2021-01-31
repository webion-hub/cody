using Cody.Contexts;
using Cody.Extensions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Helpers
{
    public record UserPictureInfo(
        int AccountDetailId,
        string BasePath,
        string FileName,
        string FullPath
    ) {
        public static async Task<UserPictureInfo> GetFrom(CodyContext dbContext, HttpContext httpContext, IFormFile formFile)
        {
            var user = await httpContext.GetLoggedUserFromAsync(dbContext);
            var accountDetailId = user.AccountDetail.Id;

            var basePath = @$"/cody_files/users/profile_pictures/{accountDetailId}/";
            var fileName = formFile.FileName;

            return new UserPictureInfo(
                AccountDetailId: accountDetailId,
                BasePath: basePath,
                FileName: fileName,
                FullPath: basePath + fileName
            );
        }
    }
}
