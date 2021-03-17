using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Renci.SshNet;
using Renci.SshNet.Async;
using Renci.SshNet.Sftp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Services.Sftp
{
    public sealed partial class SftpService : IDisposable
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
