using System.Collections.Generic;

namespace API.DTO
{
    public class UserLectureDto
    {
        public string CourseName { get; set; }
        public List<SectionDto> Sections { get; set; }
        public int CurrentLecture { get; set; }

    }
}