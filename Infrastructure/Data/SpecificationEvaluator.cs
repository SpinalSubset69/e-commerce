using System.Linq;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        //Evaluate de specification and then apply the required query, then return the collection already filtered
        public static IQueryable<T> GetQuery(IQueryable<T> inputQuery, ISpecification<T> spec){
            //At this point query variable could be "Product", "Brand", "Type", and then
            //We'll apply the specific query that we need
            var query = inputQuery;

            if(spec.Criteria != null){
                query = query.Where(spec.Criteria);
            }
            
            if(spec.OrderBy != null){
                query = query.OrderBy(spec.OrderBy);
            }

            if(spec.OrderByDesc != null){
                query = query.OrderByDescending(spec.OrderByDesc);
            }

            //Needs to be declared after all filters query
            if(spec.IsPagingEnabled){
                query = query.Skip(spec.Skip).Take(spec.Take);
            }

            //We add all the includes within the query
            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));

            return query;
        }
    }
}