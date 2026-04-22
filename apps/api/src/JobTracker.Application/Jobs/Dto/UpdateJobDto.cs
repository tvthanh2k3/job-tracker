using JobTracker.Domain.Enums;

namespace JobTracker.Application.Jobs.Dto;

public class UpdateJobDto
{
	public string Title { get; set; } = string.Empty;
	public string Company { get; set; } = string.Empty;
	public string? Url { get; set; }
	public string? Description { get; set; }
	public decimal? SalaryMin { get; set; }
	public decimal? SalaryMax { get; set; }
	public JobStatus Status { get; set; }
	public RemoteStatus RemoteStatus { get; set; }
}
