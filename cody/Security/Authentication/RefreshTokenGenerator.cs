using Cody.Contexts;
using Cody.Extensions;
using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Cody.Security.Authentication
{
    public class RefreshTokenGenerator
    {
        private readonly CodyContext _dbContext;
        private readonly ClaimsIdentity _identity;


        public static RefreshTokenGenerator CreateNew(CodyContext dbContext, ClaimsIdentity identity)
        {
            return new RefreshTokenGenerator(dbContext, identity);
        }

        public RefreshTokenGenerator(CodyContext dbContext, ClaimsIdentity identity)
        {
            _dbContext = dbContext;
            _identity = identity;
        }


        public async Task ReplaceExistingTokenForAsync(UserAccount user, UserRefreshToken token)
        {
            user.RefreshTokens?.Remove(token);
            await GenerateNewTokenForAsync(user);
        }

        public async Task GenerateNewTokenForAsync(UserAccount user)
        {
            var token = UniqueToken.Create();
            var refreshToken = new UserRefreshToken {
                Token = token.HashedToken,
                Salt = token.Salt,
            };

            user.RefreshTokens ??= new();
            user.RefreshTokens.Add(refreshToken);
            await _dbContext.SaveChangesAsync();

            _identity.UpdateRefreshToken(refreshToken.Id, token.Base64PlainTextToken);
        }
    }
}
