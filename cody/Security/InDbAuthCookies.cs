using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security
{
    internal abstract class InDbAuthCookies
    {
        protected readonly string _idName;
        protected readonly string _tokenName;

        public HttpRequest Request { get; set; }
        public HttpResponse Response { get; set; }


        protected InDbAuthCookies(string idName, string tokenName)
        {
            _idName = idName;
            _tokenName = tokenName;
        }


        public int? Id
        {
            get => int.TryParse(Request.Cookies[_idName], out var cookieId)
                ? cookieId
                : null;

            set => Response
                .Cookies
                .Append(_idName, value.ToString());
        }


        public string Token
        {
            get => Request.Cookies[_tokenName];
            set => Response.Cookies.Append(_tokenName, value, new()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
        }


        public void Delete()
        {
            Response.Cookies.Delete(_idName);
            Response.Cookies.Delete(_tokenName);
        }


        public bool AreValid => IsIdValid && IsTokenValid;
        public bool IsIdValid => Id.HasValue;
        public bool IsTokenValid => !string.IsNullOrWhiteSpace(Token);
    }
}
