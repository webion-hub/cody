using System.Net;
using System.Net.Mail;

namespace cody.Services
{
    public struct EmailServiceInfo
    {
        public string Email { get; init; }
        public string Alias { get; init; }
        public string Password { get; init; }
        public string Host { get; init; }
        public int Port { get; init; }


        public SmtpClient CreateSmtpClient()
        {
            return new SmtpClient
            {
                Host = Host,
                Port = Port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Email, Password),
            };
        }
    }
}
