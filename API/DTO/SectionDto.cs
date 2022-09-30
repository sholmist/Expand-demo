using System.Collections.Generic;

namespace API.DTO
{
    public class SectionDto
    {
        public string SectionName { get; set; }
        public List<LectureDto> Lectures { get; set; }
    }
}