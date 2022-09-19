using System.Collections.Generic;
using System.Threading.Tasks;
using Entity;
using Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly StoreContext _context;
        public CategoryRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<IReadOnlyList<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.Include(c => c.Courses).ToListAsync();
        }

        public async Task<Category> GetCategoriesByIdAsync(int id)
        {
            return await _context.Categories.Include(c => c.Courses).FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}