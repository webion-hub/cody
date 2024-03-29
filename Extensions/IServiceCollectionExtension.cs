﻿using Cody.Services;
using Cody.Services.Email;
using Cody.Services.Sftp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Cody.Extensions
{
    internal static class IServiceCollectionExtension
    {
        public static IServiceCollection AddCodyContext(
            this IServiceCollection services,
            IConfiguration configuration
        ) {
            return services.AddDbContext<Db.CodyContext>(options =>
            {
                var connectionString =
                    configuration.GetConnectionString("CodyContextRemote");

                options
                    .UseNpgsql(connectionString)
                    .UseSnakeCaseNamingConvention();
            });
        }


        public static IServiceCollection AddSftpService(
            this IServiceCollection services,
            IConfiguration configuration
        ) {
            return services.AddSingleton<SftpService>(sp => new(
                logger: sp.GetLogger<SftpService>(),
                connection: configuration.GetSftpConnection()
            ));
        }


        public static IServiceCollection AddEmailValidationService(
            this IServiceCollection services,
            IConfiguration configuration
        ) {
            return services.AddScoped<EmailVerificationService>(sp => new(
                context: sp.GetCodyContext(),
                info: configuration.GetEmailServiceInfo()
            ));
        }


        public static IServiceCollection AddPersistentLoginCookieEmitterService(
            this IServiceCollection services
        ) => services.AddScoped<PersistentLoginCookieEmitterService>();
    }
}
