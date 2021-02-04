using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public class ProfilePicturePutRequest
    {
        public string Base64 { get; set; }
        public IFormFile FormFile { get; set; }


        public Stream AsWebPImageStream()
        {
            using var requestStream = AsReadableStream();
            using var imageFactory = new ImageFactory(true);
            
            var webpStream = new MemoryStream();
            imageFactory
                .Load(requestStream)
                .Format(new WebPFormat())
                .Save(webpStream);

            return webpStream;
        }


        public Stream AsReadableStream()
        {
            return this switch
            {
                { Base64: not null } => GetBase64Stream(),
                { FormFile: not null } => FormFile.OpenReadStream(),

                _ => throw new Exception(),
            };
        }

        private Stream GetBase64Stream()
        {
            var contents = RemoveBase64Url();
            var decoded = Convert.FromBase64String(contents);

            return new MemoryStream(decoded);
        }

        private string RemoveBase64Url()
        {
            return Regex
                .Match(Base64, @"data:image/.+;base64,(.+)")
                .Groups[1]
                .Value;
        }
    }
}
