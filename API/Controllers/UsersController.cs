using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.ErrorResponse;
using AutoMapper;
using Entity;
using Infrastructure;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public UsersController(UserManager<User> userManager, TokenService tokenService, StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null ||
            !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized(new ApiResponse(401));
            }

            var userBasket = await ExtractBasket(user.UserName);
            var basket = await ExtractBasket(Request.Cookies["clientId"]);

            if (basket != null)
            {
                if (userBasket != null)
                {
                    _context.Baskets.Remove(userBasket);
                }
                basket.ClientId = user.UserName;
                Response.Cookies.Delete("clientId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = basket != null ? _mapper.Map<Basket, BasketDto>(basket) : _mapper.Map<Basket, BasketDto>(userBasket),
            };
        }

        [HttpPost("register")]

        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Student");

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }

        [Authorize]
        [HttpPost("purchaseCourses")]

        public async Task<ActionResult> AddCourses()
        {
            var basket = await ExtractBasket(User.Identity.Name);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            foreach (BasketItem course in basket.Items)
            {
                var userCourse = new UserCourse
                {
                    CourseId = course.CourseId,
                    UserId = user.Id,
                };

                _context.UserCourses.Add(userCourse);
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ApiResponse(400, "Problem adding courses"));
        }

        private async Task<Basket> ExtractBasket(string clientId)
        {
            if (string.IsNullOrEmpty(clientId))
            {
                Response.Cookies.Delete("clientId");
                return null;
            }

            return await _context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Course)
            .OrderBy(b => b.Id)
            .FirstOrDefaultAsync(x => x.ClientId == clientId);
        }
    }
}