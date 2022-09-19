using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public CoursesController(ICourseRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]

        public async Task<ActionResult<List<CourseDto>>> GetCourses()
        {
            var courses = await _repository.GetCoursesAsync();
            return Ok(_mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
        {
            var course = await _repository.GetCourseByIdAsync(id);
            return _mapper.Map<Course, CourseDto>(course);
        }

    }
}