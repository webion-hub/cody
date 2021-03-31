﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Organizations
{
    public enum OrganizationVisibility {
        Public,
        Private,
    }

    public enum OrganizationAccessCriteria {
        Open,
        OnInvite,
    }


    [Table("organization_state")]
    public class OrganizationState
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        

        [Required] public bool HasBeenVerified { get; set; }
        [Required] public bool HasBeenDeleted { get; set; }


        [Required]
        [Column(TypeName = "text")]
        public OrganizationVisibility Visibility { get; set; }

        [Required]
        [Column(TypeName = "text")]
        public OrganizationAccessCriteria AccessCriteria { get; set; }



        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
