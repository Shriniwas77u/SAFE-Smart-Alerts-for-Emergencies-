using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SAFE.Server.Models;

namespace SAFE.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordUtilController : ControllerBase
    {
        [HttpGet("hash")] // Example: /api/passwordutil/hash?password=YourPassword
        public IActionResult GetPasswordHash([FromQuery] string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                return BadRequest("Password is required.");

            var hasher = new PasswordHasher<User>();
            var hash = hasher.HashPassword(new User(), password);
            return Ok(new { password, hash });
        }
    }
}
