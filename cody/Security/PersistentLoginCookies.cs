using Microsoft.AspNetCore.Http;

namespace Cody.Security
{
    public struct PersistentLoginCookies
    {
        public const string ID = "login_cookie_id";
        public const string TOKEN = "login_cookie_token";


        public HttpRequest Request { get; set; }
        public HttpResponse Response { get; set; }


        public int? Id
        {
            get => int.TryParse(Request.Cookies[ID], out var cookieId)
                ? cookieId
                : null;

            set => Response
                .Cookies
                .Append(ID, value.ToString());
        }


        public string Token
        {
            get => Request.Cookies[TOKEN];
            set => Response.Cookies.Append(TOKEN, value, new()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
            });
        }


        public bool IsIdValid => Id.HasValue;
        public bool IsTokenValid => !string.IsNullOrWhiteSpace(Token);
    }
}
