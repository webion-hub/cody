using Cody.Contexts;
using Cody.Controllers.Requests;
using Cody.Extensions;
using Cody.Models;
using Cody.Models.Organizations;
using Cody.Services.Sftp;
using Cody.Storage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Organizations
{
    [Route("organizations")]
    [ApiController]
    [Authorize]
    public partial class OrganizationImagesController : ControllerBase
    {
        private readonly CodyContext _dbContext;
        private readonly SftpService _sftpService;

        public OrganizationImagesController(CodyContext context, SftpService sftpService)
        {
            _dbContext = context;
            _sftpService = sftpService;
        }


        private async Task<IActionResult> MaybeUploadAsync(
            int organizationId,
            ImagePutRequest request,
            Func<OrganizationDetail, StoredFileMetadata> metadataSelector
        ) {
            return await GetOrganizationAndCheckForOwnershipAsync(organizationId, andThen: async org =>
            {
                var metadata = metadataSelector(org.Detail);
                var uploaded =
                    await _sftpService.TryUploadImageAsync(request, metadata);

                if (!uploaded)
                    return Problem("Upload error");

                await _dbContext.SaveChangesAsync();
                return Ok();
            });
        }


        private async Task<IActionResult> MaybeDeleteAsync(
            int organizationId,
            Func<OrganizationDetail, StoredFileMetadata> metadataSelector,
            Action<OrganizationDetail> metadataDeleter
        ) {
            return await GetOrganizationAndCheckForOwnershipAsync(organizationId, andThen: async org =>
            {
                var metadata = metadataSelector(org.Detail);
                if (metadata is null)
                    return Ok();

                var deleted = _sftpService.TryDeleteFile(metadata.FilePath);
                if (!deleted)
                    return Problem("sftp connection error");

                metadataDeleter(org.Detail);
                await _dbContext.SaveChangesAsync();
                return Ok();
            });
        }


        private async Task<IActionResult> MaybeGetAsync(
            int organizationId, 
            Func<OrganizationDetail, StoredFileMetadata> metadataSelector
        ) {
            var organization = await GetOrganizationWithImagesAsync(organizationId);
            if (organization is null)
                return BadRequest();

            var metadata = metadataSelector(organization.Detail);
            if (metadata is null)
                return NoContent();

            var fileStream =
                await _sftpService.DownloadFileAsync(metadata.FilePath);

            return File(fileStream, metadata.ContentType);
        }


        private async Task<IActionResult> GetOrganizationAndCheckForOwnershipAsync(
            int organizationId,
            Func<Organization, Task<IActionResult>> andThen
        ) {
            var organization = await GetOrganizationWithImagesAsync(organizationId);
            if (organization is null)
                return BadRequest();

            var isOwner = await HttpContext.IsUserOwnerOfAsync(organization);
            if (!isOwner)
                return Unauthorized();

            return await andThen(organization);
        }


        private async Task<Organization> GetOrganizationWithImagesAsync(int organizationId)
        {
            return await _dbContext
                .Organizations
                .Include(o => o.Detail)
                    .ThenInclude(o => o.Background)
                .Include(o => o.Detail)
                    .ThenInclude(o => o.Logo)
                .FirstOrDefaultAsync(o => o.Id == organizationId);
        }
    }
}
