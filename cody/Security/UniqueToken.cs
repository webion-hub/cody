using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace cody.Security
{
    public class UniqueToken
    {
        public byte[] PlainTextToken { get; init; }
        public byte[] HashedToken { get; init; }
        public byte[] Salt { get; init; }


        public static UniqueToken Create()
        {
            var randomToken = Cryptography.GetRandomKey();
            var salt = Cryptography.GetRandomKey();

            return From(randomToken, salt);
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
