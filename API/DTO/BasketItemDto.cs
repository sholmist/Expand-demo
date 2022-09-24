using System;

namespace API.DTO
{
    public class BasketItemDto
    {
        public Guid CourseId { get; set; }
        public string Title { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
        public string Instructor { get; set; }
    }
}