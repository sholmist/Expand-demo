using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.ErrorResponse;
using AutoMapper;
using Entity;
using Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public BasketController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await ExtractBasket();

            if (basket == null)
            {
                return NotFound(new ApiResponse(404));
            }

            var basketResponse = _mapper.Map<Basket, BasketDto>(basket);

            return basketResponse;
        }

        [HttpPost]

        public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid courseId)
        {
            Basket basket = await ExtractBasket();

            if (basket == null)
            {
                basket = CreateBasket();
            }
            var course = await _context.Courses.FindAsync(courseId);
            if (course == null)
            {
                return NotFound(new ApiResponse(404));
            }
            basket.AddCourseItem(course);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest(new ApiResponse(400, "Problem adding item to basket"));
            }

            var basketResponse = _mapper.Map<Basket, BasketDto>(basket);

            return basketResponse;
        }

        [HttpDelete]

        public async Task<ActionResult<Basket>> RemoveItemFromBasket(Guid courseId)
        {
            Basket basket = await ExtractBasket();

            if (basket == null)
            {
                return NotFound(new ApiResponse(404));
            }

            basket.RemoveCourseItem(courseId);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest(new ApiResponse(400, "Problem removing item from basket"));
            }

            return Ok();
        }

        private Basket CreateBasket()
        {
            var clientId = Guid.NewGuid().ToString();
            var options = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(10)
            };
            Response.Cookies.Append("clientId", clientId, options);

            var basket = new Basket
            {
                ClientId = clientId
            };

            _context.Baskets.Add(basket);

            return basket;
        }

        private async Task<Basket> ExtractBasket()
        {
            return await _context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Course)
            .OrderBy(b => b.Id)
            .FirstOrDefaultAsync(x => x.ClientId == Request.Cookies["clientId"]);
        }
    }
}