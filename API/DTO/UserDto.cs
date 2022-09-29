using System.Collections.Generic;
using Entity;

namespace API.DTO
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public BasketDto Basket { get; set; }
        public List<Course> Courses { get; set; }
    }
}