using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security
{
    public abstract class InDbAuthCookies
    {
        public string IdName { get; init; }
        public string TokenName { get; init; }

        public HttpRequest Request { get; set; }
        public HttpResponse Response { get; set; }


        protected InDbAuthCookies(string idName, string tokenName)
        {
            IdName = idName;
            TokenName = tokenName;
        }


        public int? Id
        {
            get => int.TryParse(Request.Cookies[IdName], out var cookieId)
                ? cookieId
                : null;

            set => Response
                .Cookies
                .Append(IdName, value.ToString());
        }


        public string Token
        {
            get => Request.Cookies[TokenName];
            set => Response.Cookies.Append(TokenName, value, new()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
        }


        public void Delete()
        {
            Response.Cookies.Delete(IdName);
            Response.Cookies.Delete(TokenName);
        }


        public bool AreValid => IsIdValid && IsTokenValid;
        public bool IsIdValid => Id.HasValue;
        public bool IsTokenValid => !string.IsNullOrWhiteSpace(Token);
    }
}
