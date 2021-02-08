using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Utility
{
    public class Base64Image: Base64DataUrl
    {
        public Base64Image(string base64Url): base(base64Url) { }

        protected override void RefreshContentTypeAndData()
        {
            base.RefreshContentTypeAndData();

            if (!ContentType.StartsWith("image"))
                throw new FormatException("The provided data url does not represent an image");
        }
    }
}
