using Cody.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
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
    public class UserProfilePicture : StoredFileMetadata
    {
        public UserProfilePicture() : base(
            basePathPrefix: "/cody_files/users/profile_pictures", 
            fileNamePrefix: "/profile_picture"
        ) {}


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public override string FilePath { get; set; }
        [Required] public int AccountDetailId { get; set; }
        [NotMapped] public override int EntityId => AccountDetailId;

        public UserAccountDetail AccountDetail { get; set; }
    }
}
