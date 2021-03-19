using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Storage
{
    public class StoredFileMetadata
    {
        private readonly string _basePathPrefix;
        private readonly string _fileNamePrefix;


        public virtual string FilePath { get; set; }
        public virtual int EntityId { get; }


        public StoredFileMetadata(
            string basePathPrefix, 
            string fileNamePrefix
        ) {
            _basePathPrefix = basePathPrefix;
            _fileNamePrefix = fileNamePrefix;
        }


        [NotMapped]
        public string ContentType
        {
            get => MimeTypes.TryGetMimeType(FileName, out var contentType)
                ? contentType
                : "image/*";
        }

        /// <summary>
        /// The extension in the format <c>.extension_name</c>
        /// </summary>
        [NotMapped]
        public string Extension
        {
            get => Path.GetExtension(FilePath);
            set => FilePath = CreateNewFilePathFor(EntityId, value);
        }

        [NotMapped] public string BasePath => GetBasePathFor(EntityId);
        [NotMapped] public string FileName => GetFileNameFor(Extension);


        public string CreateNewFilePathFor(int accountDetailId, string fileNameOrExtension)
        {
            var basePath = GetBasePathFor(accountDetailId);
            var fileName = GetFileNameFor(fileNameOrExtension);

            return $@"{basePath}/{fileName}";
        }

        public string GetBasePathFor(int entityId)
        {
            return @$"{_basePathPrefix}/{entityId}";
        }

        public string GetFileNameFor(string fileNameOrExtension)
        {
            var extension = Path.GetExtension(fileNameOrExtension);
            var fileName = $@"{_fileNamePrefix}{extension}";

            return fileName;
        }
    }
}
