using Cody.Models;
using Konscious.Security.Cryptography;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cody.Security
{
    public class Password
    {
        public const int DegreeOfParallelism = 1;
        public const int Iterations = 4;
        public const int MemorySize = 256;
        public const int DigestLength = 256;


        public static async Task<UserAccountPassword> CreateAsync(string plainText)
        {
            var password = Encoding.UTF8.GetBytes(plainText);
            var salt = Cryptography.GetRandomKey();
            var hash = await HashAsync(password, salt);

            return new UserAccountPassword
            {
                Hash = hash,
                Salt = salt,
                Metadata = new Argon2PasswordMetadata 
                {
                    DegreeOfParallelism = DegreeOfParallelism,
                    Iterations = Iterations,
                    MemorySize = MemorySize,
                }
            };
        }

        private static async Task<byte[]> HashAsync(byte[] password, byte[] salt)
        {
            using var argon2 = new Argon2id(password)
            {
                Salt = salt,
                DegreeOfParallelism = DegreeOfParallelism,
                Iterations = Iterations,
                MemorySize = MemorySize,
            };

            return await argon2.GetBytesAsync(DigestLength);
        }


        public static async Task<bool> AreEqualAsync(string plainTextPassword, byte[] hashedPassword)
        {
            var maybePassword = await CreateAsync(plainTextPassword);
            return maybePassword
                .Hash
                .SequenceEqual(hashedPassword);
        }
    }
}
