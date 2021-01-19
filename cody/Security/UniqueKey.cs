using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace cody.Security
{
    public class UniqueKey
    {
        public byte[] PlainTextKey { get; init; }
        public byte[] HashedKey { get; init; }
        public byte[] Salt { get; init; }


        public static UniqueKey Create()
        {
            var randomKey = Cryptography.GetRandomKey();
            var salt = Cryptography.GetRandomKey();

            return From(randomKey, salt);
        }

        public static UniqueKey From(byte[] plainKey, byte[] salt)
        {
            var hashed = 
                Cryptography.HashKey(plainKey, salt);

            return new()
            {
                PlainTextKey = plainKey,
                HashedKey = hashed,
                Salt = salt,
            };
        }

        public static bool AreEqual(UniqueKey plain, UniqueKey hashed)
        {
            return AreEqual(plain, hashed.HashedKey);
        }

        public static bool AreEqual(UniqueKey plain, byte[] hashed)
        {
            return plain
                .HashedKey
                .SequenceEqual(hashed);
        }
    }
}
