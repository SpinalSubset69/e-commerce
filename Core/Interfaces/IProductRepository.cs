using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        //Métodos asincronos ya que consultaremos la base de datos
        Task<Product>  GetProductByIdAsync(int id);
        //Lista que será solo para leer los productos
        Task<IReadOnlyList<Product>> GetProductsListAsync();
        Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>> GetProductTypeAsync();
    }
}