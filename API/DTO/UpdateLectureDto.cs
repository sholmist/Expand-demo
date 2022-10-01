using System;

namespace API.DTO
{
    public class UpdateLectureDto
    {
        public int LectureId { get; set; }
        public Guid CourseId { get; set; }
    }
}