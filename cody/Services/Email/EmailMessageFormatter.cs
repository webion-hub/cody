using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Cody.Services.Email
{
    internal class EmailMessageFormatter
    {
        private static readonly Lazy<string> _complexEmailModel;
        private static readonly Lazy<string> _simpleEmailModel;

        private readonly MailAddress _from;
        private readonly MailAddress _to;
        private readonly string _validationUrl;
        private readonly string _username;


        static EmailMessageFormatter()
        {
            _simpleEmailModel = new(() => File.ReadAllText(
                path: "Assets/validate_email_simple_model.html",
                encoding: Encoding.UTF8
            ));

            _complexEmailModel = new(() => File.ReadAllText(
                path: "Assets/validate_email_complex_model.html",
                encoding: Encoding.UTF8
            ));
        }


        public EmailMessageFormatter(
            MailAddress from,
            MailAddress to,
            string validationUrl,
            string username
        ) {
            _from = from;
            _to = to;
            _validationUrl = validationUrl;
            _username = username;
        }


        public MailMessage CreateMessage()
        {
            var message = GetSimpleMessage();
            var alternateView = GetAlternateView();

            message.AlternateViews.Add(alternateView);
            return message;
        }


        private MailMessage GetSimpleMessage()
        {
            return new MailMessage(_from, _to)
            {
                Subject = "Convalida dell'account",
                BodyEncoding = Encoding.UTF8,
                Body = ReplaceModelPlaceholders(_simpleEmailModel.Value),
            };
        }

        private AlternateView GetAlternateView()
        {
            var content = 
                ReplaceModelPlaceholders(_complexEmailModel.Value);

            return AlternateView.CreateAlternateViewFromString(
                content: content,
                contentEncoding: Encoding.UTF8,
                mediaType: "text/html"
            );
        }


        private string ReplaceModelPlaceholders(string emailModel)
        {
            return emailModel
                .Replace("{username}", _username)
                .Replace("{validationUrl}", _validationUrl);
        }
    }
}
