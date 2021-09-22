using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)        
        : base(x =>  //We verify if theres brandId, then we only get that product that has the brandId
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
        )
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.pageSize * (productParams.PageIndex - 1), productParams.pageSize);

            if(!string.IsNullOrEmpty(productParams.Sort)){
                switch(productParams.Sort){
                    case "priceAsc":
                    AddOrderBy(p => p.Price);
                    break;
                    case "priceDesc":
                    AddOrderByDesc( p => p.Price);
                    break;
                    default:
                    AddOrderByDesc(p => p.Name);
                    break;
                }
            }
        }
        //<Summary>
        //Returns a product based on its ID
        //</Summary>
        public ProductsWithTypesAndBrandsSpecification(int id)
        :base(x => x.Id == id)
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }
        public ProductsWithTypesAndBrandsSpecification()
        {
            AddIncludes(x => x.ProductType);
            AddIncludes(x => x.ProductBrand);
        }
    }
}