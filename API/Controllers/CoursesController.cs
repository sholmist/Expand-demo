using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entity;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CoursesController : BaseController
    {
        private readonly StoreContext _context;
        public CoursesController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Course>>> GetCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Course>> GetCourse(Guid id)
        {
            return await _context.Courses.FindAsync(id);
        }

    }
}