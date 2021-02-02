using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("user_profile_picture")]
    public class UserProfilePicture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public string FilePath { get; set; }
        [Required] public int AccountDetailId { get; set; }


        public UserAccountDetail AccountDetail { get; set; }


        [NotMapped]
        public IFormFile Picture { get; set; }

        [NotMapped]
        public string ContentType => $"image/{Extension}";

        [NotMapped]
        public string Extension
        {
            get => Path.GetExtension(FilePath);
            set => FilePath = CreateNewFilePathFor(AccountDetailId, value);
        }

        [NotMapped] public string BasePath => GetBasePathFor(AccountDetailId);
        [NotMapped] public string FileName => GetFilePathFor(Extension);


        public static string CreateNewFilePathFor(int accountDetailId, string fileNameOrExtension)
        {
            var basePath = GetBasePathFor(accountDetailId);
            var filePath = GetFilePathFor(fileNameOrExtension);

            return $@"{basePath}/{filePath}";
        }

        public static string GetBasePathFor(int accoundDetailId)
        {
            return @$"/cody_files/users/profile_pictures/{accoundDetailId}";
        }

        public static string GetFilePathFor(string fileNameOrExtension)
        {
            var extension = Path.GetExtension(fileNameOrExtension);
            var filePath = $@"profile_picture{extension}";

            return filePath;
        }
    }
}
