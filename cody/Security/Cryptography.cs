using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace cody.Security
{
    public class Cryptography
    {
        public static byte[] GetRandomKey(uint length = 16)
        {
            using var generator = RandomNumberGenerator.Create();

            var result = new byte[length];
            generator.GetBytes(result);

            return result;
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
