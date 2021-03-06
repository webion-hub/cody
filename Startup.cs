using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using Cody.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Cody.Security.Authorization;
using Cody.Services.Sftp;
using Cody.Services;
using Cody.Security.Authentication.Cookies;
using Cody.Db.Bags;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace Cody
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
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });


            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration => 
            {
                configuration.RootPath = "ClientApp/build";
            });


            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.SameSite = SameSiteMode.Strict;
                    options.Cookie.HttpOnly = true;
                    options.Cookie.Name = "cody_session";

                    options.LoginPath = "/login";
                    options.LogoutPath = "/logout";
                    options.AccessDeniedPath = "/access-denied";

                    options.Events.OnValidatePrincipal = async (context) =>
                    {
                        var dbContext = context
                            .HttpContext
                            .RequestServices
                            .GetCodyContext();

                        await SessionCookieRefresher
                            .For(context, new AuthBags(dbContext))
                            .MaybeRefreshAsync();
                    };
                });


            services.AddScoped<IAuthorizationHandler, UserRolesAuthorizationHandler>(sp =>
            {
                var dbContext = sp.GetCodyContext();
                return new(new UsersBag(dbContext));
            });

            services
                .AddLogging()
                .AddCodyContext(Configuration)
                .AddSftpService(Configuration)
                .AddEmailValidationService(Configuration)
                .AddPersistentLoginCookieEmitterService();

            services.AddHttpClient<BingMapsService>();
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

            var staticFileOptions = new StaticFileOptions {
                OnPrepareResponse = e => {
                    e.Context.Response.Headers.Add("Cache-Control", "max-age=31557600");
                }
            };

            app.UseHsts();
            app.UseHttpsRedirection();
            app.UseStaticFiles(staticFileOptions);
            app.UseSpaStaticFiles(staticFileOptions);

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();

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
