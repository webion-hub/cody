using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Utilities
{
    public class Base64DataUrl
    {
        private string _base64Url;
        public string Base64Url { 
            get => _base64Url;
            set {
                _base64Url = value;
                RefreshContentTypeAndData();
            }
        }

        public string ContentType { get; private set; }
        public string Data { get; private set; }

        public Stream AsDecodedStream() => new MemoryStream(AsDecodedByteArray());
        public byte[] AsDecodedByteArray() => Convert.FromBase64String(Data);


        public Base64DataUrl(string base64Url)
        {
            Base64Url = base64Url;
        }


        protected virtual void RefreshContentTypeAndData()
        {
            var matchedGroups = MatchContentTypeAndData();

            ContentType = matchedGroups["content_type"].Value;
            Data = matchedGroups["data"].Value;
        }

        private GroupCollection MatchContentTypeAndData()
        {
            var matchedGroups = Regex.Match(
                input: Base64Url, 
                pattern: @"data:(?<content_type>.+);base64,(?<data>.+)", 
                options: RegexOptions.None,
                matchTimeout: TimeSpan.FromMilliseconds(250)
            ).Groups;

            if (matchedGroups.Count == 0)
                throw new FormatException("The provided string is not a data url");

            return matchedGroups;
        }
    }
}
