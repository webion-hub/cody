using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cody.Models.Organizations.Courses
{
    [Table("course")]
    public class Course : Entity.WithTitleAndDescription
    {
        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }

        public List<Member> Members { get; set; }
        public List<Lesson> Lessons { get; set; }
    }
}
