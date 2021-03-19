using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models.Organizations;
using Cody.Storage;
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
        [HttpPut("{organizationId}/background")]
        [Authorize]
        public async Task<IActionResult> PutBackground(
            [FromRoute] int organizationId, 
            [FromForm] ImagePutRequest request
        ) {
            return await MaybeUploadAsync(organizationId, request, (od) =>
            {
                od.Background ??= new();
                return od.Background;
            });
        }

        [HttpDelete("{organizationId}/background")]
        [Authorize]
        public async Task<IActionResult> DeleteBackground(int organizationId) 
        {
            return await MaybeDeleteAsync(
                organizationId, 
                od => od.Background,
                od => _dbContext.Remove(od.Background)
            );
        }

        [HttpGet("{organizationId}/background")]
        [Authorize]
        public async Task<IActionResult> GetBackground(int organizationId)
        {
            return await MaybeGetAsync(
                organizationId,
                od => od.Background
            );
        }
    }
}
