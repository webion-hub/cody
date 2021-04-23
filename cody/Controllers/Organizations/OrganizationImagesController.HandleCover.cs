using Cody.Controllers.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationImagesController
    {
        [HttpPut("{organizationId}/cover")]
        [Authorize]
        public async Task<IActionResult> PutCover(
            [FromRoute] int organizationId, 
            [FromForm] ImagePutRequest request
        ) {
            return await MaybeUploadAsync(organizationId, request, (od) =>
            {
                return od.Cover ??= new() {
                    OrganizationDetailId = od.Id,
                };
            });
        }

        [HttpDelete("{organizationId}/cover")]
        [Authorize]
        public async Task<IActionResult> DeleteCover(int organizationId) 
        {
            return await MaybeDeleteAsync(
                organizationId, 
                od => od.Cover,
                od => _dbContext.OrganizationCovers.Remove(od.Cover)
            );
        }

        [HttpGet("{organizationId}/cover")]
        [Authorize]
        public async Task<IActionResult> GetCover(int organizationId)
        {
            return await MaybeGetAsync(
                organizationId,
                od => od.Cover
            );
        }
    }
}
