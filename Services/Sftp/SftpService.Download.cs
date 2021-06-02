using Cody.Storage;
using Microsoft.Extensions.Logging;
using Renci.SshNet.Async;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Services.Sftp
{
    public sealed partial class SftpService
    {
        public async Task<Stream> DownloadFileAsync(StoredFileMetadata metadata)
        {
            return await DownloadFileAsync(metadata.FilePath);
        }

        public async Task<Stream> DownloadFileAsync(string remoteFilePath)
        {
            var stream = new MemoryStream();
            try
            {
                var fileInfo = _client.Get(remoteFilePath);
                stream.SetLength(fileInfo.Attributes.Size);

                await _client.DownloadAsync(remoteFilePath, stream);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Stfp service - download error -> {remoteFilePath}");
                return null;
            }

            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }
    }
}
