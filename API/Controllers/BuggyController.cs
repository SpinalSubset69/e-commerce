using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly Context _context;
        public BuggyController(Context context)
        {
            _context = context;

        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText(){
            return "Secret Stuff";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {   
            var thing = _context.Products.Find(500);

            if(thing == null){
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42);
            var thingToReturn = thing.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));    
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}