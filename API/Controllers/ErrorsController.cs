using API.ErrorResponse;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorsController : BaseController
    {
        private readonly StoreContext _context;
        public ErrorsController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet("authcheck")]
        [Authorize]

        public ActionResult<string> CheckAuthorization()
        {
            return "You are authorized";
        }

        [HttpGet("notfound")]

        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Categories.Find(42);

            if (thing == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerErrorRequest()
        {
            var thing = _context.Categories.Find(42);

            return Ok(thing.ToString());
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadIdRequest(int id)
        {
            return Ok();
        }
    }
}