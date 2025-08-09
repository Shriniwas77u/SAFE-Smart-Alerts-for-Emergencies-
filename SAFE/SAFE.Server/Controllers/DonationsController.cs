using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAFE.Server.Data;
using SAFE.Server.Models;
using System.Security.Claims;

namespace SAFE.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonationsController : ControllerBase
    {
        private readonly SafeDbContext _context;
        public DonationsController(SafeDbContext context)
        {
            _context = context;
        }

        // POST: api/donations
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateDonation(CreateDonationRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            if (userId == 0)
                return Unauthorized();
            if (request.Amount <= 0)
                return BadRequest("Amount must be greater than zero.");
            if (string.IsNullOrWhiteSpace(request.Type))
                return BadRequest("Donation type is required.");

            // TODO: Integrate payment gateway here (e.g., Stripe)
            // For now, mark as Pending
            var donation = new Donation
            {
                UserId = userId,
                Amount = request.Amount,
                Type = request.Type,
                Message = request.Message ?? string.Empty,
                Status = "Pending",
                PaymentReference = request.PaymentReference ?? string.Empty,
                PaymentMethod = request.PaymentMethod ?? string.Empty,
                CreatedDate = DateTime.UtcNow
            };
            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();
            return Ok(donation);
        }

        // GET: api/donations/my
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyDonations()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                if (userId == 0)
                    return Unauthorized();
                var isAdmin = User.IsInRole("Admin");
                var donations = isAdmin
                    ? await _context.Donations.OrderByDescending(d => d.CreatedDate).ToListAsync()
                    : await _context.Donations.Where(d => d.UserId == userId).OrderByDescending(d => d.CreatedDate).ToListAsync();
                return Ok(donations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // GET: api/donations (admin only)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllDonations()
        {
            try
            {
                var donations = await _context.Donations
                    .Include(d => d.User)
                    .OrderByDescending(d => d.CreatedDate)
                    .ToListAsync();
                return Ok(donations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        // PUT: api/donations/{id}/status
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDonationStatus(int id, [FromBody] UpdateDonationStatusRequest request)
        {
            var donation = await _context.Donations.FindAsync(id);
            if (donation == null)
                return NotFound();
            donation.Status = request.Status;
            await _context.SaveChangesAsync();
            return Ok(donation);
        }

        public class UpdateDonationStatusRequest
        {
            public string Status { get; set; } = string.Empty;
        }
    }

    public class CreateDonationRequest
    {
        public decimal Amount { get; set; }
        public string Type { get; set; } = "Funds";
        public string? Message { get; set; }
        public string? PaymentReference { get; set; }
        public string? PaymentMethod { get; set; }
    }
}
