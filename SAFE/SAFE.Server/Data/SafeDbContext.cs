using Microsoft.EntityFrameworkCore;
using SAFE.Server.Models;

namespace SAFE.Server.Data
{
    public class SafeDbContext : DbContext
    {
        public SafeDbContext(DbContextOptions<SafeDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<HelpRequest> HelpRequests { get; set; }
        public DbSet<Incident> Incidents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.Property(e => e.EmergencyContact).HasMaxLength(100);
                
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Alert entity configuration
            modelBuilder.Entity<Alert>(entity =>
            {
                entity.HasKey(e => e.AlertId);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.AlertType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Priority).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.GeoTargeting).HasMaxLength(200);

                entity.HasOne(a => a.Creator)
                      .WithMany(u => u.CreatedAlerts)
                      .HasForeignKey(a => a.CreatedBy)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // HelpRequest entity configuration
            modelBuilder.Entity<HelpRequest>(entity =>
            {
                entity.HasKey(e => e.HelpRequestId);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.Urgency).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Location).IsRequired().HasMaxLength(300);
                entity.Property(e => e.ContactInfo).HasMaxLength(100);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Notes).HasMaxLength(1000);

                entity.HasOne(hr => hr.Requester)
                      .WithMany(u => u.HelpRequests)
                      .HasForeignKey(hr => hr.RequesterId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(hr => hr.AssignedResponder)
                      .WithMany()
                      .HasForeignKey(hr => hr.AssignedResponderId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

            // Incident entity configuration
            modelBuilder.Entity<Incident>(entity =>
            {
                entity.HasKey(e => e.IncidentId);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.IncidentType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Location).HasMaxLength(300);
                entity.Property(e => e.Priority).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Notes).HasMaxLength(1000);

                entity.HasOne(i => i.Reporter)
                      .WithMany(u => u.ReportedIncidents)
                      .HasForeignKey(i => i.ReportedBy)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed data
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Email = "admin@safe.com",
                    PasswordHash = "AQAAAAEAACcQAAAAEPnLzJGr2v1QM8HJ1jK2v3e4w5z8x7y6t5r4e3w2q1",
                    FirstName = "SAFE",
                    LastName = "Administrator",
                    PhoneNumber = "+1-555-0000",
                    Role = "Admin",
                    IsActive = true,
                    CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
        }
    }
}