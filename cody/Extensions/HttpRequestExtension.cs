using Cody.Security;
using Microsoft.AspNetCore.Http;

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

            return cookies.AreValid;
        }
    }
}
