using Cody.Db;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class IServiceProviderExtension
    {
        public static ILogger<T> GetLogger<T>(this IServiceProvider serviceProvider)
        {
            return serviceProvider.GetRequiredService<ILogger<T>>();
        }
        
        public static CodyContext GetCodyContext(this IServiceProvider serviceProvider)
        {
            return serviceProvider.GetRequiredService<CodyContext>();
        }
    }
}
