using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Renci.SshNet;
using Renci.SshNet.Sftp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Services
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


        public void UploadFile(IFormFile file, string remoteFilePath)
        {
            try {
                using var fileStream = file.OpenReadStream();
                _client.UploadFile(fileStream, remoteFilePath);
                _logger.LogInformation($"Stfp service - uploaded -> {file.Name} to {remoteFilePath}");
            }
            catch (Exception e) {
                _logger.LogError(e, $"Stfp service - upload failed -> {file.Name} to {remoteFilePath}");
            }
        }


        public IFormFile DownloadFile(string remoteFilePath)
        {
            using var stream = new MemoryStream();
            SftpFile fileInfo;
            try {
                fileInfo = _client.Get(remoteFilePath);
                stream.SetLength(fileInfo.Attributes.Size);
                
                _client.DownloadFile(remoteFilePath, stream);
                _logger.LogInformation($"Stfp service - downloaded -> {remoteFilePath}");
            }
            catch (Exception e) {
                _logger.LogError(e, $"Stfp service - download error -> {remoteFilePath}");
                return null;
            }

            return new FormFile(stream, 0, fileInfo.Attributes.Size, fileInfo.Name, fileInfo.FullName);
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
