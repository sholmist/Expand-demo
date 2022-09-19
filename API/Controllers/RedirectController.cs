using API.ErrorResponse;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("redirect/{code}")]
    public class RedirectController : BaseController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}