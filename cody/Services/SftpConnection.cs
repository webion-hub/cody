using Renci.SshNet;

namespace cody.Services
{
    public struct SftpConnection
    {
        public string Host { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


        public static implicit operator ConnectionInfo(SftpConnection conn)
        {
            var passwordAuth =
                new PasswordAuthenticationMethod(conn.Username, conn.Password);

            return new ConnectionInfo(
                conn.Host, 
                conn.Username,
                passwordAuth
            );
        }
    }
}
