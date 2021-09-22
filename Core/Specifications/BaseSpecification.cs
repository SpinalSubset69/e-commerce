using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        public BaseSpecification()
        {
            
        }
        public BaseSpecification(Expression<Func<T, bool>> criteria){
            Criteria = criteria;
        }
        public Expression<Func<T, bool>> Criteria { get; set; }
        public List<Expression<Func<T, object>>> Includes { get; set;} = new List<Expression<Func<T, object>>>();
        public Expression<Func<T, object>> OrderBy { get; set; }
        public Expression<Func<T, object>> OrderByDesc { get; set; }

        public int Take { get; set; }

        public int Skip { get; set; }

        public bool IsPagingEnabled { get; set; }

        protected void ApplyPaging(int skip, int take){
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }

        //Setters of Evuluators
        protected void AddIncludes(Expression<Func<T, Object>> includeExpression){
            Includes.Add(includeExpression);
        }

        protected void AddOrderBy(Expression<Func<T, Object>> orderByexpression){
            OrderBy = orderByexpression;
        }

        protected void AddOrderByDesc(Expression<Func<T, Object>> orderByDesc){
            OrderByDesc = orderByDesc;
        }
    }
}