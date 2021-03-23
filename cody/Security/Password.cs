using Cody.Models;
using Konscious.Security.Cryptography;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cody.Security
{
    internal class Password
    {
        public static async Task<UserAccountPassword> CreateAsync(string plainText)
        {
            var password = Encoding.UTF8.GetBytes(plainText);
            var salt = Cryptography.GetRandomKey();
            var opts = new Argon2Options();

            var hash = 
                await HashAsync(password, salt, opts);

            return new UserAccountPassword 
            {
                Hash = hash,
                Salt = salt,
                Metadata = opts.ToMetadata(),
            };
        }

        public static async Task<bool> AreEqualAsync(string plainTextPassword, UserAccountPassword password)
        {
            var rawPw = Encoding.UTF8.GetBytes(plainTextPassword);
            var opts = Argon2Options.From(password.Metadata);

            var maybePassword = 
                await HashAsync(rawPw, password.Salt, opts);

            return password
                .Hash
                .SequenceEqual(maybePassword);
        }


        private static async Task<byte[]> HashAsync(
            byte[] password, 
            byte[] salt, 
            Argon2Options options
        ) {
            using var argon2 = new Argon2id(password) 
            {
                Salt = salt,
                DegreeOfParallelism = options.DegreeOfParallelism,
                Iterations = options.Iterations,
                MemorySize = options.MemorySize,
            };

            return await argon2.GetBytesAsync(options.DigestLength);
        }
    }
}
