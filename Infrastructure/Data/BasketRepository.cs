using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            //Connection to database
            _database = redis.GetDatabase();
        }
        public async Task<bool> DeleteBasketAsync(string bascketId)
        {
            return await _database.KeyDeleteAsync(bascketId);
        }

        public async Task<CustomerBasket> getBasketAsync(string basketId)
        {   
            var data = await _database.StringGetAsync(basketId);
            return  data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);   
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket)
                                                        , TimeSpan.FromDays(30));//Duracion del basket

            if(!created) return null;
            return await getBasketAsync(basket.Id);
        }
    }
}