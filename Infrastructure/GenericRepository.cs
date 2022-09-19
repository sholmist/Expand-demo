using Entity.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T>
    {
        public Task<T> GetByIdAsync(dynamic id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyList<T>> ListAllAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}