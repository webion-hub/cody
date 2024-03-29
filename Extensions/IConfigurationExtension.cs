﻿using Cody.Services;
using Cody.Services.Email;
using Cody.Services.Sftp;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class IConfigurationExtension
    {
        public static SftpConnection GetSftpConnection(this IConfiguration configuration)
        {
            return configuration
                .GetSection("SftpConnection")
                .Get<SftpConnection>();
        }


        public static EmailServiceInfo GetEmailServiceInfo(this IConfiguration configuration)
        {
            return configuration
                .GetSection("EmailServiceInfo")
                .Get<EmailServiceInfo>();
        }
    }
}
