using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Cody.Security
{
    public class Cryptography
    {
        public static byte[] GetRandomKey()
        {
            return GetRandomKeys(256, 1).First();
        }

        public static (byte[], byte[]) GetRandomPair()
        {
            var keys = 
                GetRandomKeys(256, 2).ToArray();
            
            return (keys[0], keys[1]);
        }

        public static IEnumerable<byte[]> GetRandomKeys(uint length, uint howMany)
        {
            using var generator = RandomNumberGenerator.Create();

            while (howMany-- > 0)
            {
                var result = new byte[length];
                generator.GetBytes(result);
                
                yield return result;
            }

            yield break;
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
