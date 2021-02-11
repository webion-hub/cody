using Cody.Utility;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using Shorthand.ImageSharp.WebP;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Controllers.Requests
{
    public class ProfilePicturePutRequest
    {
        public string Base64 { get; set; }
        public IFormFile FormFile { get; set; }


        public string FileExtension => this switch
        {
            { Base64: not null } => new Base64Image(Base64).FileExtension,
            { FormFile: not null } => Path.GetExtension(FormFile.FileName),

            _ => ".img",
        };


        public async Task<Stream> AsWebPImageStreamAsync()
        {
            using var requestStream = AsReadableStream();
            using var img = await Image.LoadAsync(requestStream);
            var webpStream = new MemoryStream();

            await img.SaveAsync(webpStream, new WebPEncoder());
            return webpStream;
        }


        public Stream AsReadableStream()=> this switch
        {
            { Base64: not null } => GetBase64Stream(),
            { FormFile: not null } => FormFile.OpenReadStream(),

            _ => throw new Exception(),
        };

        private Stream GetBase64Stream()
        {
            return new Base64Image(Base64).AsDecodedStream();
        }
    }
}
