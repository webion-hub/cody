using Cody.Utility;
using ImageProcessor;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Text.RegularExpressions;

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
            return new Base64Image(Base64).AsDecodedStream();
        }
    }
}
