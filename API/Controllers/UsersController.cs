using System.Threading.Tasks;
using API.DTO;
using API.ErrorResponse;
using Entity;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public UsersController(UserManager<User> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]

        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null ||
            !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
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
    }
}