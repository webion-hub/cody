using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Storage
{
    public class StoredFile
    {
        public Stream FileStream { get; set; }
        public StoredFileMetadata Metadata { get; set; }
    }
}
