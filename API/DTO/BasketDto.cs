using System.Collections.Generic;

namespace API.DTO
{
    public class BasketDto
    {
        public string ClientId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}