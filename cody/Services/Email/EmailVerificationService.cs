using Cody.Contexts;
using Cody.Models.Users;
using System;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Cody.Services.Email
{
    public sealed class EmailVerificationService : IDisposable
    {
        private readonly CodyContext _dbContext;
        private readonly SmtpClient _smtpClient;
        private readonly MailAddress _from;

        public EmailVerificationService(
            CodyContext context, 
            EmailServiceInfo info
        ) {
            _dbContext = context;
            _from = new MailAddress(info.Email, info.Alias);
            _smtpClient = info.CreateSmtpClient();
        }


        public async Task MarkUserForVerificationAsync(UserAccount user)
        {
            user.AccountState = new UserAccountState
            {
                VerificationKey = Guid.NewGuid(),
                IsEmailVerified = false,
            };

            await _dbContext.SaveChangesAsync();
            await SendVerificationEmailAsync(user);
        }


        private async Task SendVerificationEmailAsync(UserAccount user)
        {
            var to = new MailAddress(user.Email);
            var accountState = user.AccountState;
            var validationUrl =
                $"https://iscody.com/user/verify/{user.Id}/{accountState.VerificationKey}";

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
