using Cody.Security.Validation;
using Cody.Security.Validation.Attributes;
using Cody.Security.Validation.Rejection;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models
{
    [Table("user_biography")]
    public class UserBiography : IRejectable
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int AccountDetailId { get; set; }
        public UserAccountDetail AccountDetail { get; set; }


        [DefaultDescriptionLength]
        public string Contents { get; set; }


        public RejectionResult MaybeReject()
        {
            return Rejector.MaybeReject(new()
            {
                { "biography", Contents, default, FieldLength.MaxDescriptionLength }
            });
        }
    }
}