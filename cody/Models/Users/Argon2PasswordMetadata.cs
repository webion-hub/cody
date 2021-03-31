using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    [Table("argon2_password_metadata")]
    public class Argon2PasswordMetadata
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required]
        public int PasswordId { get; set; }
        public UserAccountPassword Password { get; set; }


        [Required] public int DegreeOfParallelism { get; set; }
        [Required] public int Iterations { get; set; }
        [Required] public int MemorySize { get; set; }
        [Required] public int DigestLength { get; set; }
    }
}
