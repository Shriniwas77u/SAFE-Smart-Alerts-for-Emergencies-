using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using SAFE.Server.Data;
using SAFE.Server.Models;

namespace SAFE.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelpRequestsController : ControllerBase
    {
        private readonly SafeDbContext _context;

        public HelpRequestsController(SafeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<HelpRequestDto>>> GetHelpRequests()
        {
            var helpRequests = await _context.HelpRequests
                .Include(hr => hr.Requester)
                .Include(hr => hr.AssignedResponder)
                .OrderByDescending(hr => hr.CreatedDate)
                .Select(hr => new HelpRequestDto
                {
                    HelpRequestId = hr.HelpRequestId,
                    Type = hr.Type,
                    Description = hr.Description,
                    Urgency = hr.Urgency,
                    Location = hr.Location,
                    Status = hr.Status,
                    CreatedDate = hr.CreatedDate,
                    AssignedDate = hr.AssignedDate,
                    CompletedDate = hr.CompletedDate,
                    RequesterName = $"{hr.Requester.FirstName} {hr.Requester.LastName}",
                    AssignedResponderName = hr.AssignedResponder != null ? $"{hr.AssignedResponder.FirstName} {hr.AssignedResponder.LastName}" : null,
                    ContactInfo = hr.ContactInfo,
                    Notes = hr.Notes
                })
                .ToListAsync();

            return Ok(helpRequests);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<HelpRequestDto>> GetHelpRequest(int id)
        {
            var helpRequest = await _context.HelpRequests
                .Include(hr => hr.Requester)
                .Include(hr => hr.AssignedResponder)
                .FirstOrDefaultAsync(hr => hr.HelpRequestId == id);

            if (helpRequest == null)
            {
                return NotFound();
            }

            var dto = new HelpRequestDto
            {
                HelpRequestId = helpRequest.HelpRequestId,
                Type = helpRequest.Type,
                Description = helpRequest.Description,
                Urgency = helpRequest.Urgency,
                Location = helpRequest.Location,
                Status = helpRequest.Status,
                CreatedDate = helpRequest.CreatedDate,
                AssignedDate = helpRequest.AssignedDate,
                CompletedDate = helpRequest.CompletedDate,
                RequesterName = $"{helpRequest.Requester.FirstName} {helpRequest.Requester.LastName}",
                AssignedResponderName = helpRequest.AssignedResponder != null ? $"{helpRequest.AssignedResponder.FirstName} {helpRequest.AssignedResponder.LastName}" : null,
                ContactInfo = helpRequest.ContactInfo,
                Notes = helpRequest.Notes
            };

            return Ok(dto);
        }

        [HttpGet("my-requests")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<HelpRequestDto>>> GetMyHelpRequests()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var helpRequests = await _context.HelpRequests
                .Include(hr => hr.Requester)
                .Include(hr => hr.AssignedResponder)
                .Where(hr => hr.RequesterId == userId)
                .OrderByDescending(hr => hr.CreatedDate)
                .Select(hr => new HelpRequestDto
                {
                    HelpRequestId = hr.HelpRequestId,
                    Type = hr.Type,
                    Description = hr.Description,
                    Urgency = hr.Urgency,
                    Location = hr.Location,
                    Status = hr.Status,
                    CreatedDate = hr.CreatedDate,
                    AssignedDate = hr.AssignedDate,
                    CompletedDate = hr.CompletedDate,
                    RequesterName = $"{hr.Requester.FirstName} {hr.Requester.LastName}",
                    AssignedResponderName = hr.AssignedResponder != null ? $"{hr.AssignedResponder.FirstName} {hr.AssignedResponder.LastName}" : null,
                    ContactInfo = hr.ContactInfo,
                    Notes = hr.Notes
                })
                .ToListAsync();

            return Ok(helpRequests);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<HelpRequestDto>> CreateHelpRequest(CreateHelpRequestRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var helpRequest = new HelpRequest
            {
                Type = request.Type,
                Description = request.Description,
                Urgency = request.Urgency,
                Location = request.Location,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                RequesterId = userId,
                ContactInfo = request.ContactInfo,
                Status = "Pending",
                CreatedDate = DateTime.UtcNow,
                Notes = request.Notes
            };

            _context.HelpRequests.Add(helpRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHelpRequest), new { id = helpRequest.HelpRequestId }, new HelpRequestDto
            {
                HelpRequestId = helpRequest.HelpRequestId,
                Type = helpRequest.Type,
                Description = helpRequest.Description,
                Urgency = helpRequest.Urgency,
                Location = helpRequest.Location,
                Status = helpRequest.Status,
                CreatedDate = helpRequest.CreatedDate,
                ContactInfo = helpRequest.ContactInfo,
                Notes = helpRequest.Notes
            });
        }

        [HttpPut("{id}/assign")]
        [Authorize(Roles = "Admin,Responder")]
        public async Task<IActionResult> AssignHelpRequest(int id, AssignHelpRequestRequest request)
        {
            var helpRequest = await _context.HelpRequests.FindAsync(id);
            if (helpRequest == null)
            {
                return NotFound();
            }

            helpRequest.AssignedResponderId = request.ResponderId;
            helpRequest.Status = "Assigned";
            helpRequest.AssignedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateHelpRequestStatus(int id, UpdateHelpRequestStatusRequest request)
        {
            var helpRequest = await _context.HelpRequests.FindAsync(id);
            if (helpRequest == null)
            {
                return NotFound();
            }

            helpRequest.Status = request.Status;
            if (request.Status == "Completed")
            {
                helpRequest.CompletedDate = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class HelpRequestDto
    {
        public int HelpRequestId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Urgency { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string RequesterName { get; set; } = string.Empty;
        public string? AssignedResponderName { get; set; }
        public string ContactInfo { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class CreateHelpRequestRequest
    {
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Urgency { get; set; } = "Medium";
        public string Location { get; set; } = string.Empty;
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string ContactInfo { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class AssignHelpRequestRequest
    {
        public int ResponderId { get; set; }
    }

    public class UpdateHelpRequestStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }
}