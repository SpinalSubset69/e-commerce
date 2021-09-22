using System.Collections.Generic;

namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public int PageIndex {get; set;}
        public int PageSize {get; set;}
        public decimal Count {get; set;}
        public IReadOnlyList<T> Data {get; set;}

        public Pagination(int pageSize, int pageIndex, decimal count, IReadOnlyList<T> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Count = count;
            Data = data;
        }
    }
}