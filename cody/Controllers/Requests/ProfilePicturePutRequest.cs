using Cody.Utilities;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using Shorthand.ImageSharp.WebP;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Cody.Extensions;

namespace Cody.Controllers.Requests
{
    public class ProfilePicturePutRequest
    {
        public string Base64 { get; set; }
        public IFormFile FormFile { get; set; }


        public async Task<Stream> AsJpegImageStreamAsync()
        {
            using var requestStream = AsReadableStream();
            using var img = await Image.LoadAsync(requestStream);

            return await img.SaveAsJpegAsync();
        }


        public Stream AsReadableStream() => this switch
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
