using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Cody.Security
{
    public class UniqueToken
    {
        public string Base64PlainTextToken => Convert.ToBase64String(PlainTextToken);
        public byte[] PlainTextToken { get; init; }
        public byte[] HashedToken { get; init; }
        public byte[] Salt { get; init; }


        public static UniqueToken Create()
        {
            var (token, salt) = 
                Cryptography.GetRandomPair();
            
            return From(token, salt);
        }

        public static UniqueToken From(byte[] plainTextToken, byte[] salt)
        {
            var hashed = 
                Cryptography.HashKey(plainTextToken, salt);

            return new()
            {
                PlainTextToken = plainTextToken,
                HashedToken = hashed,
                Salt = salt,
            };
        }

        public static bool AreEqual(UniqueToken plain, UniqueToken hashed)
        {
            return AreEqual(plain, hashed.HashedToken);
        }

        public static bool AreEqual(UniqueToken plain, byte[] hashed)
        {
            return plain
                .HashedToken
                .SequenceEqual(hashed);
        }
    }
}
