﻿using Cody.Storage;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models.Organizations
{
    [Table("organization_background")]
    public class OrganizationBackground : StoredFileMetadata
    {
        public OrganizationBackground() : base(
            basePathPrefix: "/cody_files/organizations/",
            fileNamePrefix: "/background"
        ) { }


        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public override string FilePath { get; set; }
        [Required] public int OrganizationDetailId { get; set; }
        [NotMapped] public override int EntityId => OrganizationDetailId;

        public OrganizationDetail OrganizationDetail { get; set; }
    }
}
