using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public interface ISpecification<T> 
    {
         Expression<Func<T, bool>> Criteria {get; set;}

         List<Expression<Func<T, Object>>> Includes {get; set;}

         Expression<Func<T, Object>> OrderBy {get; set;}
         Expression<Func<T, Object>> OrderByDesc {get; set;}

         //Properties for pagination
         int Take {get;}
         int Skip {get;}

         bool IsPagingEnabled {get; }
    }
}