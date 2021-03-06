using System.Linq;
using API.Errors;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {

        public static IServiceCollection AddApplicationSevices(this IServiceCollection services)
        {

            services.AddScoped<IBasketRepository, BasketRepository>();
            //Una nueva instancia de nuestro context será creada cada que llamamos los controladores
            services.AddScoped<IProductRepository, ProductRepository>(); //Transient es para un método en específico y se destruye cuando termina ese métdodo
                                                                         //Singleton dura toda la sesión 
                                                                         //Agregamos el repositoio generico a los servicios
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddScoped<ITokenService, TokenService>();

            //CORS
            services.AddCors(op =>
            {
                op.AddPolicy("CorsPolicy", policy =>
                {
                    //Allowing only angular port, for react we have to use react defaul port
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });

            services.AddAutoMapper(typeof(MappingProfiles));

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse()
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}