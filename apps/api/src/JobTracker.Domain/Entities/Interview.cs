using JobTracker.Domain.Common;

namespace JobTracker.Domain.Entities;

public class Interview : BaseEntity
{
    public Guid JobId { get; set; }
    public DateTime ScheduledAt { get; set; }
    public string Round { get; set; } = string.Empty;
    public string? Notes { get; set; }

    // Navigation properties
    public Job? Job { get; set; }
}
