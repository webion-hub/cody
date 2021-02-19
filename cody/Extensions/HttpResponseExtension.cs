using Cody.Security;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    public static class HttpResponseExtension
    {
        public static void SetLoginCookies(this HttpResponse response, int id, string token)
        {
            var cookies = new PersistentLoginCookies {
                Response = response,
            };

            cookies.Id = id;
            cookies.Token = token;
        }


        public static void DeleteLoginCookies(this HttpResponse response)
        {
            new PersistentLoginCookies {
                Response = response
            }.Delete();
        }
    }
}
