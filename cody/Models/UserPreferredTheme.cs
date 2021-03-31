using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models
{
    public enum ThemeColor {
        Light,
        Dark,
    };


    [Table("user_preferred_theme")]
    public class UserPreferredTheme
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }


        [Required, Column(TypeName = "text")]
        public ThemeColor Color { get; set; }


        [Required]
        public int AccountDetailId { get; set; }
        public UserAccountDetail AccountDetail { get; set; }
    }
}
