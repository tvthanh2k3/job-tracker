using JobTracker.Domain.Common;
using JobTracker.Domain.Enums;

namespace JobTracker.Domain.Entities;

public class Job : BaseEntity
{
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string? Url { get; set; }
    public string? Description { get; set; }
    public decimal? SalaryMin { get; set; }
    public decimal? SalaryMax { get; set; }
    public JobStatus Status { get; set; } = JobStatus.Applied;
    public RemoteStatus RemoteStatus { get; set; } = RemoteStatus.Onsite;

    // Navigation properties
    public User? User { get; set; }
    public ICollection<Interview> Interviews { get; set; } = new List<Interview>();
}
