using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Entity.Interfaces
{
    public interface ICourseRepository
    {
         Task<Course> GetCourseByIdAsync(Guid id);
         Task<IReadOnlyList<Course>> GetCoursesAsync();
    }
}