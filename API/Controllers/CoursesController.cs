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
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Course> _repository;
        public CoursesController(IGenericRepository<Course> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]

        public async Task<ActionResult<List<CourseDto>>> GetCourses()
        {
            var courses = await _repository.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<Course>, IReadOnlyList<CourseDto>>(courses));
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<CourseDto>> GetCourse(Guid id)
        {
            var course = await _repository.GetByIdAsync(id);
            return _mapper.Map<Course, CourseDto>(course);
        }

    }
}