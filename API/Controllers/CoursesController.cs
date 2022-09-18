using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entity;
using Entity.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CoursesController : BaseController
    {
        private readonly ICourseRepository _repository;
        public CoursesController(ICourseRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]

        public async Task<ActionResult<List<Course>>> GetCourses()
        {
            var courses =  await _repository.GetCoursesAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Course>> GetCourse(Guid id)
        {
            return await _repository.GetCourseByIdAsync(id);
        }

    }
}