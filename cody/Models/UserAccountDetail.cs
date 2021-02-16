using Cody.Security;
using Cody.Security.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("user_account_detail")]
    public class UserAccountDetail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public string Name { get; set; }
        [Required] public string Surname { get; set; }
        [Required] public DateTime BirthDate { get; set; }
        [Required] public DateTime RegistrationDate { get; set; }


        [Required]
        public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }


        public int? SchoolId { get; set; }
        public SchoolAccount School { get; set; }


        public UserBiography Biography { get; set; }
        public UserProfilePicture ProfilePicture { get; set; }


        public IEnumerable<string> GetRejectReasons()
        { 
            if (!FieldValidation.IsValidNameOrSurname(Name))
                yield return "name";

            if (!FieldValidation.IsValidNameOrSurname(Surname))
                yield return "surname";
        }
    }
}
