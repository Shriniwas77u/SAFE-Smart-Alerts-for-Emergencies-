using System.ComponentModel.DataAnnotations;

namespace SAFE.Server.Models
{
    public class HelpRequest
    {
        public int HelpRequestId { get; set; }
        
        [Required]
        public string Type { get; set; } = string.Empty; // Medical, Shelter, Food, Transportation, Rescue
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public string Urgency { get; set; } = "Medium"; // Low, Medium, High
        
        [Required]
        public string Location { get; set; } = string.Empty;
        
        public double? Latitude { get; set; }
        
        public double? Longitude { get; set; }
        
        public int RequesterId { get; set; }
        
        public string ContactInfo { get; set; } = string.Empty;
        
        [Required]
        public string Status { get; set; } = "Pending"; // Pending, Assigned, In Progress, Completed, Cancelled
        
        public int? AssignedResponderId { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? AssignedDate { get; set; }
        
        public DateTime? CompletedDate { get; set; }
        
        public string Notes { get; set; } = string.Empty;
        
        // Navigation properties
        public User Requester { get; set; } = null!;
        public User? AssignedResponder { get; set; }
    }
}