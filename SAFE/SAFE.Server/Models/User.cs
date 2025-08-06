using System.ComponentModel.DataAnnotations;

namespace SAFE.Server.Models
{
    public class User
    {
        public int UserId { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [Required]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        public string LastName { get; set; } = string.Empty;
        
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = "User"; // Admin, User, Donor, Responder
        
        public string Address { get; set; } = string.Empty;
        
        public string EmergencyContact { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? LastLoginDate { get; set; }
        
        // Navigation properties
        public ICollection<Alert> CreatedAlerts { get; set; } = new List<Alert>();
        public ICollection<HelpRequest> HelpRequests { get; set; } = new List<HelpRequest>();
        public ICollection<Incident> ReportedIncidents { get; set; } = new List<Incident>();
    }
}