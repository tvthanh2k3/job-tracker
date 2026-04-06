using JobTracker.Domain.Enums;

namespace JobTracker.Application.Jobs.Dto;

public class JobDto
{
	public Guid Id { get; set; }
	public string Title { get; set; } = string.Empty;
	public string Company { get; set; } = string.Empty;
	public string? Url { get; set; }
	public string? Description { get; set; }
	public decimal? SalaryMin { get; set; }
	public decimal? SalaryMax { get; set; }
	public JobStatus Status { get; set; }
	public RemoteStatus RemoteStatus { get; set; }
	public DateTime CreatedAt { get; set; }
	public DateTime? UpdatedAt { get; set; }
}
