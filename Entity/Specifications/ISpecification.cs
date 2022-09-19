using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Entity.Specifications
{
    public interface ISpecification<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Include { get; }
        Expression<Func<T, object>> OrderByAscending { get; }
        Expression<Func<T, object>> OrderByDescending { get; }
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }
    }
}