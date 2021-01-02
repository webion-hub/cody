using BCryptAlgorithm = BCrypt.Net.BCrypt;

namespace cody
{
    public class Password
    {
        public static string CreateFrom(string plainText)
        {
            return BCryptAlgorithm.HashPassword(plainText);
        }

        public static bool AreEqual(string plainTextPassword, string hashedPassword)
        {
            return BCryptAlgorithm.Verify(plainTextPassword, hashedPassword);
        }
    }
}
