﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Users
{
    [Table("user_account_password")]
    public class UserAccountPassword
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
	    public int UserAccountId { get; set; }
        public UserAccount UserAccount { get; set; }


        public Argon2PasswordMetadata Metadata { get; set; }


	    [Required] public byte[] Hash { get; set; }
        [Required] public byte[] Salt { get; set; }
    }
}