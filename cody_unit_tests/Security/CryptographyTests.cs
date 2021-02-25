using Cody.Security;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace CodyUnitTests.Security
{
    public class CryptographyTests
    {
        [Fact]
        public void AreGeneratedKeysUnique()
        {
            var keySize = 56u;
            var permutations = 5;

            var generator = Cryptography.GetRandomKeys(keySize);
            while (permutations-- > 0)
            {
                var keyPair = generator
                    .Take(2)
                    .ToArray();

                AreKeysConformant(keyPair[0], keyPair[1], keySize);
            }
        }


        [Fact]
        public void GetRandomPair()
        {
            var (firstKey, secondKey) = 
                Cryptography.GetRandomPair();

            AreKeysConformant(firstKey, secondKey, Cryptography.DEFAULT_KEY_SIZE);
        }


        [Fact]
        public void GetRandomKey()
        {
            var aKey = Cryptography.GetRandomKey();
            var anotherKey = Cryptography.GetRandomKey();

            AreKeysConformant(aKey, anotherKey, Cryptography.DEFAULT_KEY_SIZE);
        }


        private static void AreKeysConformant(byte[] aKey, byte[] anotherKey, uint expectedLength)
        {
            AreKeysUnique(aKey, anotherKey);
            IsLengthEqualToExpected(aKey, expectedLength);
            IsLengthEqualToExpected(anotherKey, expectedLength);
        }


        private static void AreKeysUnique(byte[] aKey, byte[] anotherKey)
        {
            Assert.NotEqual(aKey, anotherKey);
        }

        private static void IsLengthEqualToExpected(byte[] key, uint expectedLength) 
        {
            Assert.True(
                condition: key.Length == expectedLength,
                userMessage: $"The key length was not {expectedLength}"
            );
        }
    }
}
