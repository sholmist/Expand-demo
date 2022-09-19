using System.Collections.Generic;
using System.Threading.Tasks;

namespace Entity.Interfaces
{
    public interface IGenericRepository<T>
    {
         Task<IReadOnlyList<T>> ListAllAsync();

         Task<T> GetByIdAsync(dynamic id);
    }
}