using cody.Contexts;
using cody.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Renci.SshNet;

namespace cody
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration => 
            {
                configuration.RootPath = "ClientApp/build";
            });


            services.AddDbContext<CodyContext>(options =>
            {
                var connectionString =
                    Configuration.GetConnectionString("CodyContextRemote");

                options
                    .UseNpgsql(connectionString)
                    .UseSnakeCaseNamingConvention();
            });


            services.AddLogging();
            services.AddSingleton<SftpService>(serviceProvider =>
            {
                var logger = 
                    serviceProvider.GetRequiredService<ILogger<SftpService>>();

                var connection = Configuration
                    .GetSection("SftpConnection")
                    .Get<SftpConnection>();

                return new(logger, connection);
            });

            services.AddSingleton<EmailValidationService>(serviceProvider =>
            {
                var logger =
                    serviceProvider.GetRequiredService<ILogger<EmailValidationService>>();

                using var scope = serviceProvider.CreateScope();
                var codyContext = scope
                    .ServiceProvider
                    .GetRequiredService<CodyContext>();

                var info = Configuration
                    .GetSection("EmailServiceInfo")
                    .Get<EmailServiceInfo>();

                return new(logger, codyContext, info);
            });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, SftpService sftp)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}"
                );
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            sftp.Connect();
        }
    }
}
