using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace cody.Models
{
    [Table("user_profile_picture")]
    public class UserProfilePicture
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Required] 
        public string FilePath { get; set; }
        
        [NotMapped]
        public IFormFile Picture { get; set; }


        [Required]
        public int UserAccountDetailId { get; set; }
        public UserAccountDetail UserAccountDetail { get; set; }
    }
}
