using System;
using System.Collections.Generic;

namespace Entity
{
    public class Section
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Lecture> Lectures { get; set; }
        public Guid CourseId { get; set; }
        public Course Course { get; set; }
    }
}