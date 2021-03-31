using Cody.Models.Organizations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("favorite_organization")]
    public class FavoriteOrganization
    {
        [Required] public int UserAccountId { get; set; }
        [Required] public int OrganizationId { get; set; }


        public UserAccount UserAccount { get; set; }
        public Organization Organization { get; set; }
    }
}
