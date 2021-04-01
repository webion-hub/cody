using Cody.Models.Organizations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("bookmarked_organization")]
    public class BookmarkedOrganization
    {
        [Required] public int UserAccountId { get; set; }
        [Required] public int OrganizationId { get; set; }


        public UserAccount UserAccount { get; set; }
        public Organization Organization { get; set; }
    }
}
