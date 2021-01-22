using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("school_account_state")]
    public class SchoolAccountState
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        

        [Required] public bool HasBeenVerified { get; set; }


        [Required]
        public int SchoolId { get; set; }
        public SchoolAccount School { get; set; }
    }
}
