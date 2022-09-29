using System;

namespace Entity
{
    public class UserCourse
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
    }
}