using Infrastructure;
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

        [HttpGet("notfound")]

        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Categories.Find(42);

            if (thing == null)
            {
                return NotFound();
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
            return BadRequest();
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadIdRequest(int id)
        {
            return Ok();
        }
    }
}