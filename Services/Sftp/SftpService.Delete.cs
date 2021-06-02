using Microsoft.Extensions.Logging;
using Renci.SshNet.Async;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Services.Sftp
{
    public sealed partial class SftpService
    {
        public async Task DeleteAllFilesAsync(string path)
        {
            var directory =
                await _client.ListDirectoryAsync(path);

            foreach (var file in directory)
            {
                if (file.IsDirectory)
                    continue;

                file.Delete();
            }
        }


        public async Task DeleteAllFilesExceptAsync(string path, string exceptionFileName)
        {
            var directory =
                await _client.ListDirectoryAsync(path);

            foreach (var file in directory)
            {
                if (file.IsDirectory)
                    continue;

                if (file.Name == exceptionFileName)
                    continue;

                file.Delete();
            }
        }

        public bool TryDeleteFile(string remoteFilePath)
        {
            try
            {
                _client.DeleteFile(remoteFilePath);
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Stfp service - delete error -> {remoteFilePath}");
                return false;
            }
        }
    }
}
