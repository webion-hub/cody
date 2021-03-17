using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Renci.SshNet.Async;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cody.Services.Sftp
{
    public sealed partial class SftpService
    {
        public async Task<bool> TryUploadFileAsync(IFormFile file, string remoteFilePath)
        {
            using var fileStream =
                file.OpenReadStream();

            return await TryUploadFileAsync(fileStream, remoteFilePath);
        }

        public async Task<bool> TryUploadFileAsync(string contents, string remoteFilePath)
        {
            var rawBytes = Encoding.UTF8.GetBytes(contents);
            var stream = new MemoryStream(rawBytes);

            return await TryUploadFileAsync(stream, remoteFilePath);
        }

        public async Task<bool> TryUploadFileAsync(Stream stream, string remoteFilePath)
        {
            try
            {
                MaybeCreateDirectiories(remoteFilePath);
                await _client.UploadAsync(stream, remoteFilePath);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Stfp service - upload failed -> {remoteFilePath}");
                return false;
            }
        }
    }
}
