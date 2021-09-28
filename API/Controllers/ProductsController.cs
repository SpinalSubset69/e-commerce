using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using API.DTOS;
using AutoMapper;
using API.Helpers;
using System;

namespace API.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> productsRepos;
        private readonly IGenericRepository<ProductBrand> brandsRepo;
        private readonly IGenericRepository<ProductType> typesRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> productsRepos,
                                  IGenericRepository<ProductBrand> brandsRepo,
                                  IGenericRepository<ProductType> typesRepo,
                                  IMapper mapper)
        {
            this.productsRepos = productsRepos;
            this.brandsRepo = brandsRepo;
            this.typesRepo = typesRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<Product>>> GetProducts(
            [FromQuery]ProductSpecParams productParams){
            
            //We create the sepecification
             var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
             var countSpec = new ProductWithFiltersForCountSpecification(productParams);
             var totalItems = await productsRepos.CountAsync(countSpec);
             var products = await productsRepos.ListAsync(spec);
             var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);                   
            return Ok(new Pagination<ProductToReturnDTO>(productParams.pageSize, productParams.PageIndex, totalItems, data));
        }

        [HttpGet("{id}")] //Recibe un parametro
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id){
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await productsRepos.GetEntityWithSpec(spec);
           return mapper.Map<Product, ProductToReturnDTO>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> ProductsBrands(){
            return Ok(await brandsRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<ProductBrand>> ProductsTypes(){
            return Ok(await typesRepo.ListAllAsync());
        }
    }
}   