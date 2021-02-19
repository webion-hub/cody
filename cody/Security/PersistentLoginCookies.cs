using Microsoft.AspNetCore.Http;

namespace Cody.Security
{
    public class PersistentLoginCookies : InDbAuthCookies
    {
        public PersistentLoginCookies() : base(
            idName: "login_cookie_id",
            tokenName: "login_cookie_token"
        ){}
    }
}
