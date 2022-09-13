using System;

namespace Entity
{
    public class Course
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public float Price { get; set; }

        public string Instructor { get; set; }

        public decimal Rating { get; set; }

        public string Image { get; set; }
    }
}