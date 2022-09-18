using System.Collections.Generic;
using System.Threading.Tasks;
using Entity;
using Entity.Interfaces;

namespace Infrastructure
{
    public class CourseRepository : ICourseRepository
    {
        public Task<Course> GetCourseByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyList<Course>> GetCoursesAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}