using JobTracker.Domain.Common;

namespace JobTracker.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }

    // Navigation properties
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
}
