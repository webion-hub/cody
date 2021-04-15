using Cody.Models.Users;
using Cody.Security;
using Cody.Security.Authentication;
using System;
using System.Security.Claims;

namespace Cody.Extensions
{
    public static class ClaimsIdentityExtension
    {
        public static DateTime? MaybeGetExpirationTime(this ClaimsIdentity identity)
        {
            var expiration = identity.GetExpirationClaim();
            return DateTime.TryParse(expiration?.Value, out var res)
                ? res
                : null;
        }

        public static Claim GetExpirationClaim(this ClaimsIdentity identity)
        {
            return identity.FindFirst(ClaimTypes.Expiration);
        }

        public static void RefreshExpirationTime(this ClaimsIdentity identity)
        {
            identity.RemoveClaimIfExists(ClaimTypes.Expiration);
            identity.AddClaim(new Claim(
                type: ClaimTypes.Expiration,
                value: SessionCookieRefresher.ExpirationTime.ToString()
            ));
        }


        public static int? MaybeGetRefreshTokenId(this ClaimsIdentity identity)
        {
            var refreshTokenId = identity.FindFirst("refresh_token_id");
            return int.TryParse(refreshTokenId?.Value, out var id)
                ? id
                : null;
        }


        public static bool DoRefreshTokensMatch(this ClaimsIdentity identity, UserRefreshToken token)
        {
            var base64Token = identity.FindFirst("refresh_token");
            if (base64Token is null || token is null)
                return false;

            return UniqueToken.AreEqual(
                plainTextToken: Convert.FromBase64String(base64Token.Value),
                salt: token.Salt,
                hashed: token.Token
            );
        }


        public static void UpdateRefreshToken(this ClaimsIdentity identity, int tokenId, string token)
        {
            identity.RemoveClaimIfExists("refresh_token_id");
            identity.RemoveClaimIfExists("refresh_token");

            identity.AddClaims(new[]
            {
                new Claim("refresh_token_id", tokenId.ToString()),
                new Claim("refresh_token", token),
            });
        }


        public static void RemoveClaimIfExists(this ClaimsIdentity identity, string claimType)
        {
            var claim = identity.FindFirst(claimType);
            identity.TryRemoveClaim(claim);
        }
    }
}
