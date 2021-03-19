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
        [HttpPut("{organizationId}/logo")]
        [Authorize]
        public async Task<IActionResult> PutLogo(
            [FromRoute] int organizationId,
            [FromBody] ImagePutRequest request
        )
        {
            return await MaybeUploadAsync(organizationId, request, (od) =>
            {
                od.Logo ??= new();
                return od.Logo;
            });
        }

        [HttpDelete("{organizationId}/logo")]
        [Authorize]
        public async Task<IActionResult> DeleteLogo(int organizationId)
        {
            return await MaybeDeleteAsync(
                organizationId,
                od => od.Logo,
                od => _dbContext.Remove(od.Logo)
            );
        }

        [HttpGet("{organizationId}/logo")]
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
