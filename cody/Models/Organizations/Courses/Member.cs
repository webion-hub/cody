using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models.Organizations.Courses
{
    public enum MemberRole {
        Professor,
        Student,
    }


    [Table("course_member")]
    public class Member
    {
        [Required] public int CourseId { get; set; }
        [Required] public int UserAccountId { get; set; }


        [Required]
        [Column(TypeName = "text")]
        public MemberRole Role { get; set; }


        public Course Course { get; set; }
        public UserAccount UserAccount { get; set; }
    }
}
