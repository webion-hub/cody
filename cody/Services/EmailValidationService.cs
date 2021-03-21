using Cody.Contexts;
using Cody.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Cody.Services
{
    public class EmailValidationService : IDisposable
    {
        private readonly ILogger<EmailValidationService> _logger;
        private readonly CodyContext _context;
        private readonly SmtpClient _smtpClient;
        private readonly MailAddress _from;
        private readonly Lazy<string> _emailModel;

        public EmailValidationService(
            ILogger<EmailValidationService> logger, 
            CodyContext context, 
            EmailServiceInfo info
        ) {
            _logger = logger;
            _context = context;
            _from = new MailAddress(info.Email, info.Alias);
            _smtpClient = info.CreateSmtpClient();

            _emailModel = new(() => File.ReadAllText(
                path: "Assets/validate_email_model.html", 
                encoding: Encoding.UTF8
            ));
        }


        public async Task MarkUserForValidationAsync(UserAccount user)
        {
            user.AccountState = new UserAccountState
            {
                ValidationKey = Guid.NewGuid(),
                IsEmailValid = false,
            };

            await _context.SaveChangesAsync();
            await SendValidationEmailAsync(user);
        }


        private async Task SendValidationEmailAsync(UserAccount user)
        {
            var to = new MailAddress(user.Email);
            var accountState = user.AccountState;
            var validationUrl =
                $"https://localhost/user/validate/{user.Id}/{accountState.ValidationKey}";

            using var message = CreateMessage(to, validationUrl);

            await _smtpClient.SendMailAsync(message);
        }


        private MailMessage CreateMessage(MailAddress to, string validationUrl)
        {
            var message = new MailMessage(_from, to)
            {
                Subject = "Convalida dell'account",
                BodyEncoding = Encoding.UTF8,
                Body = $@"
                    Benvenuto in cody!
                    Prima di iniziare a scoprire cody, devi confermare la tua email!

                    Confermando l'email potrai utilizzare tutte le funzioni di cody ed entrare in contatto con gli altri utenti.

                    <a href='{validationUrl}'>Verifica la tua email</a>
                    Se non hai creato tu l'account inviaci una mail a info@cody.com
                ",
            };

            var alternateView = AlternateView.CreateAlternateViewFromString(
                content: _emailModel.Value.Replace("{0}", validationUrl),
                contentEncoding: Encoding.UTF8,
                mediaType: "text/html"
            );

            message.AlternateViews.Add(alternateView);
            return message;
        }


        public void Dispose()
        {
            _smtpClient.Dispose();
        }
    }
}
