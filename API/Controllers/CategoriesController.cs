using System.Collections.Generic;
using System.Threading.Tasks;
using Entity;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoriesController : BaseController
    {
        private readonly ICategoryRepository _repository;
        public CategoriesController(ICategoryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]

        public async Task<ActionResult<IReadOnlyList<Category>>> GetCategories()
        {
            var categories = await _repository.GetCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _repository.GetCategoriesByIdAsync(id);
            return category;
        }
    }
}