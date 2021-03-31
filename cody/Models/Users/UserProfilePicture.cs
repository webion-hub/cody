using Cody.Storage;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
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
