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

namespace Cody.Services.Email
{
    public sealed class EmailValidationService : IDisposable
    {
        private readonly CodyContext _context;
        private readonly SmtpClient _smtpClient;
        private readonly MailAddress _from;

        public EmailValidationService(
            CodyContext context, 
            EmailServiceInfo info
        ) {
            _context = context;
            _from = new MailAddress(info.Email, info.Alias);
            _smtpClient = info.CreateSmtpClient();
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

            var formatter = new EmailMessageFormatter(_from, to, validationUrl, user.Username);
            var message = formatter.CreateMessage();

            await _smtpClient.SendMailAsync(message);
        }


        public void Dispose()
        {
            _smtpClient.Dispose();
        }
    }
}
