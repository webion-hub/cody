using Cody.Security;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class HttpRequestExtension
    {
        public static bool TryGetLoginCookies(this HttpRequest request, out int cookieId, out string token)
        {
            var cookies = new PersistentLoginCookies { 
                Request = request,
            };

            token = cookies.Token;
            cookieId = cookies.Id ?? 0;

            return
                cookies.IsIdValid &&
                cookies.IsTokenValid;
        }
    }
}
