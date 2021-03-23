using Cody.Contexts;
using Cody.Services;
using Cody.Services.Sftp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class IServiceCollectionExtension
    {
        public static IServiceCollection AddCodyContext(
            this IServiceCollection services,
            IConfiguration configuration
        ) {
            return services.AddDbContext<CodyContext>(options =>
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
            return services.AddScoped<EmailValidationService>(sp => new(
                logger: sp.GetLogger<EmailValidationService>(), 
                context: sp.GetCodyContext(),
                info: configuration.GetEmailServiceInfo()
            ));
        }


        public static IServiceCollection AddPersistentLoginCookieEmitterService(
            this IServiceCollection services
        ) => services.AddScoped<PersistentLoginCookieEmitterService>();
    }
}
