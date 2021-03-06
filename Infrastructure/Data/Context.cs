using System.Linq;
using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class Context : DbContext
    {
        public Context( DbContextOptions<Context> options) : base(options)
        {
        }


        public DbSet<Product> Products { get; set; } //Nombre de la tabla en la base de datos
        public DbSet<ProductType> ProductTypes {get; set;}
        public DbSet<ProductBrand> ProductBrands {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            
            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite"){
                foreach(var entityType in modelBuilder.Model.GetEntityTypes()){
                    var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));
                    foreach(var property in properties){
                        modelBuilder.Entity(entityType.Name).Property(property.Name)
                        .HasConversion<double>();
                    }
                }
            }
        }   
    }
}