using System.ComponentModel.DataAnnotations;

namespace SAFE.Server.Models
{
    public class Alert
    {
        public int AlertId { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public string AlertType { get; set; } = string.Empty; // Weather, Medical, Infrastructure, etc.
        
        [Required]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        
        [Required]
        public string Status { get; set; } = "Active"; // Active, Resolved, Expired
        
        public int CreatedBy { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? ExpiryDate { get; set; }
        
        public string GeoTargeting { get; set; } = string.Empty; // Geographic area
        
        public int AffectedPopulation { get; set; } = 0;
        
        // Navigation properties
        public User Creator { get; set; } = null!;
    }
}