using cody.Contexts;
using cody.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace cody.Services
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

            _emailModel = new(() => File.ReadAllText("Assets/validate_email_model.html"));
        }


        public async Task RegisterUserForValidationAsync(UserAccount user)
        {
            user.AccountState = new UserAccountState
            {
                ValidationKey = Guid.NewGuid(),
            };

            await _context.SaveChangesAsync();
            await SendValidationEmailAsync(user);
        }


        private async Task SendValidationEmailAsync(UserAccount user)
        {
            var to = new MailAddress(user.Email);
            var accountState = user.AccountState;
            var validationUrl =
                $"https://cody.com/{user.Id}/{accountState.ValidationKey}";

            using var message = CreateMessage(to, validationUrl);

            await _smtpClient.SendMailAsync(message);
        }


        private MailMessage CreateMessage(MailAddress to, string validationUrl)
        {
            return new MailMessage(_from, to)
            {
                Subject = "Convalida dell'account",
                IsBodyHtml = true,
                Body = string.Format(
                    format: _emailModel.Value,
                    arg0: validationUrl
                ),
            };
        }


        public void Dispose()
        {
            _smtpClient.Dispose();
        }
    }
}
