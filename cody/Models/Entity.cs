using Cody.Security.Validation.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    public abstract class Entity
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        public abstract class WithTitleAndDescription : Entity
        {
            [Required, DefaultMaxLength]
            public string Title { get; set; }

            [DefaultDescriptionLength]
            public string Description { get; set; }
        }
    }
}
