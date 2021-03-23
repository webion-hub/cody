using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security.Authorization
{
    internal class SessionRefreshCookies : InDbAuthCookies
    {
        public SessionRefreshCookies() : base(
            idName: "refresh_cookie_id", 
            tokenName: "refresh_cookie_token"
        ) {}
    }
}
