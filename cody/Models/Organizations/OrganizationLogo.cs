using Cody.Storage;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Organizations
{
    [Table("organization_logo")]
    public class OrganizationLogo : StoredFileMetadata
    {
        public OrganizationLogo() : base(
            basePathPrefix: "/cody_files/organizations",
            fileNamePrefix: "/logo"
        ) { }


        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public override string FilePath { get; set; }
        [Required] public int OrganizationDetailId { get; set; }
        [NotMapped] public override int EntityId => OrganizationDetailId;

        public OrganizationDetail OrganizationDetail { get; set; }
    }
}
