using Cody.Models.Interfaces;
using Cody.Security.Validation.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Models.Organizations.Courses
{
    public enum LessonKind {
        Lesson,
        Exercise,
    }


    [Table("course_lesson")]
    public class Lesson : Entity.WithTitleAndDescription
    {
        [Required]
        [Column(TypeName = "text")]
        public LessonKind Kind { get; set; }


        [Required]
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
