using SixLabors.ImageSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Extensions
{
    internal static class ImageExtension
    {
        public static async Task<Stream> SaveAsJpegAsync(this Image self)
        {
            var jpegStream = new MemoryStream();

            await self.SaveAsJpegAsync(jpegStream);
            jpegStream.Seek(0, SeekOrigin.Begin);

            return jpegStream;
        }
    }
}
