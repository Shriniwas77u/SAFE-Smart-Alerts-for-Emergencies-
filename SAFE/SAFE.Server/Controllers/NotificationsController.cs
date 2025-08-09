using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using SAFE.Server.Data;

namespace SAFE.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly SafeDbContext _context;

        public NotificationsController(SafeDbContext context)
        {
            _context = context;
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyNotifications()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedDate)
                .Select(n => new {
                    n.NotificationId,
                    n.Type,
                    n.Message,
                    n.CreatedDate,
                    n.Status
                })
                .ToListAsync();
            return Ok(notifications);
        }
    }
}
