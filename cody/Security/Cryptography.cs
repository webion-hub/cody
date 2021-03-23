using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Cody.Security
{
    internal class Cryptography
    {
        public const int DEFAULT_KEY_SIZE = 256;


        public static byte[] GetRandomKey()
        {
            return GetRandomKeys(DEFAULT_KEY_SIZE).First();
        }

        public static (byte[], byte[]) GetRandomPair()
        {
            var keys = GetRandomKeys(DEFAULT_KEY_SIZE)
                .Take(2)
                .ToArray();
            
            return (keys[0], keys[1]);
        }

        public static IEnumerable<byte[]> GetRandomKeys(uint keySize)
        {
            using var generator = RandomNumberGenerator.Create();

            while (true)
            {
                var result = new byte[keySize];
                generator.GetBytes(result);
                
                yield return result;
            }
        }

        public static byte[] HashKey(byte[] key, byte[] salt) 
        {
            var data = new byte[key.Length + salt.Length];
            key.CopyTo(data, 0);
            salt.CopyTo(data, key.Length);

            return SHA384.HashData(data);
        }
    }
}
