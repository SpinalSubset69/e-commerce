using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{statusCode}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorsController : BaseApiController
    {

        public IActionResult Error(int statusCode) {
            return new ObjectResult(new ApiResponse(statusCode));
        }
    }
}