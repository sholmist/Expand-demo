using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Specifications;

namespace Entity.Interfaces
{
    public interface IGenericRepository<T>
    {
         Task<IReadOnlyList<T>> ListAllAsync();

         Task<T> GetByIdAsync(dynamic id);

         Task<T> GetEntityWithSpec(ISpecification<T> spec);

        Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec);
    }
}