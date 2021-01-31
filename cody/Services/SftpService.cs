using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Renci.SshNet;
using Renci.SshNet.Async;
using Renci.SshNet.Sftp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Services
{
    public class SftpService : IDisposable
    {
        private readonly ILogger<SftpService> _logger;
        private readonly SftpClient _client;
        private bool _disposed;


        public SftpService(ILogger<SftpService> logger, SftpConnection connection)
        {
            _logger = logger;
            _client = new(connection);
            _logger.LogInformation("Sftp service mounted");
        }

        public void Connect()
        {
            _client.Connect();
            _logger.LogInformation("Sftp service connected");
        }


        public IEnumerable<SftpFile> ListAllFiles(string remoteDirectory = ".")
        {
            try {
                return _client.ListDirectory(remoteDirectory);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Stfp service - file listing failed {remoteDirectory}");
                return null;
            }
        }


        public async Task<bool> TryUploadFileAsync(IFormFile file, string remoteFilePath)
        {
            try {
                using var fileStream = file.OpenReadStream();
                await _client.UploadAsync(fileStream, remoteFilePath);
                
                _logger.LogInformation($"Stfp service - uploaded -> {file.FileName} to {remoteFilePath}");
                return true;
            }
            catch (Exception e) {
                _logger.LogError(e, $"Stfp service - upload failed -> {file.FileName} to {remoteFilePath}");
                return false;
            }
        }


        public async Task<Stream> DownloadFileAsync(string remoteFilePath)
        {
            var stream = new MemoryStream();
            try {
                var fileInfo = _client.Get(remoteFilePath);
                stream.SetLength(fileInfo.Attributes.Size);
                
                await _client.DownloadAsync(remoteFilePath, stream);
            }
            catch (Exception e) {
                _logger.LogError(e, $"Stfp service - download error -> {remoteFilePath}");
                return null;
            }

            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }


        public async Task DeleteAllExceptAsync(string path, string exception)
        {
            var directory =
                await _client.ListDirectoryAsync(path);

            foreach (var file in directory)
            {
                if (file.IsDirectory)
                    continue;

                if (file.Name == exception)
                    continue;

                file.Delete();
            }
        }

        public void DeleteFile(string remoteFilePath)
        {
            try {
                _client.DeleteFile(remoteFilePath);
                _logger.LogInformation($"Stfp service - deleted -> {remoteFilePath}");
            }
            catch (Exception e) {
                _logger.LogError(e, $"Stfp service - delete error -> {remoteFilePath}");
            }
        }


        public void MaybeCreateDirectiories(string path)
        {
            var folders = 
                path.Split('/', StringSplitOptions.RemoveEmptyEntries);

            string current = string.Empty;
            foreach (var folder in folders)
            {
                if (Regex.IsMatch(folder, @".+\..+"))
                    continue;

                current += @$"/{folder}";

                if (!_client.Exists(current))
                    _client.CreateDirectory(current);
            }
        }


        public void Dispose()
        {
            if (_disposed)
                return;

            _client.Dispose();
            _disposed = true;
            _logger.LogDebug("Sftp service disposed");
        }
    }
}
