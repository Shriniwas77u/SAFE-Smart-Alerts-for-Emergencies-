using System.ComponentModel.DataAnnotations;

namespace SAFE.Server.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        [Required]
        public string Type { get; set; } = string.Empty; // SMS, Email, InApp
        [Required]
        public string Message { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public int? IncidentId { get; set; }
        public Incident? Incident { get; set; }
        public int? UserId { get; set; } // recipient
        public User? User { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Sent, Failed
    }
}
