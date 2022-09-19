using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Entity.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
            
        }

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }

        public Expression<Func<T, bool>> Criteria { get; }
        public List<Expression<Func<T, object>>> Include { get; } = new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> OrderByAscending { get; private set; }

        public Expression<Func<T, object>> OrderByDescending { get; private set; }

        public int Take {get; private set;}

        public int Skip {get; private set;}

        public bool IsPagingEnabled {get; private set;}

        protected void IncludeMethod(Expression<Func<T, object>> expression)
        {
            Include.Add(expression);
        }protected void OrderByAscendingMethod(Expression<Func<T, object>> ascendingExpression)
        {
            OrderByAscending = ascendingExpression;
        }
        protected void OrderByDescendingMethod(Expression<Func<T, object>> descendingExpression)
        {
            OrderByDescending = descendingExpression;
        }
        protected void ApplyPagination(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}