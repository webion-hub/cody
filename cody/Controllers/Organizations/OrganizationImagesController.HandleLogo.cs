using Cody.Controllers.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    public partial class OrganizationImagesController
    {
        [HttpPut("logo")]
        [Authorize]
        public async Task<IActionResult> PutLogo(
            [FromRoute] int organizationId,
            [FromForm] ImagePutRequest request
        ) {
            return await MaybeUploadAsync(organizationId, request, (od) =>
            {
                return od.Logo ??= new() {
                    OrganizationDetailId = od.Id,
                };
            });
        }
        
        [HttpDelete("logo")]
        [Authorize]
        public async Task<IActionResult> DeleteLogo(int organizationId)
        {
            return await MaybeDeleteAsync(
                organizationId,
                od => od.Logo,
                od => _dbContext.OrganizationLogos.Remove(od.Logo)
            );
        }

        [HttpGet("logo")]
        [Authorize]
        public async Task<IActionResult> GetLogo(int organizationId)
        {
            return await MaybeGetAsync(
                organizationId,
                od => od.Logo
            );
        }
    }
}
