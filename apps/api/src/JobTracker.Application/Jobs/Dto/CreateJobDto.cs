using JobTracker.Domain.Enums;

namespace JobTracker.Application.Jobs.Dto;

public class CreateJobDto
{
	public string Title { get; set; } = string.Empty;
	public string Company { get; set; } = string.Empty;
	public string? Url { get; set; }
	public string? Description { get; set; }
	public string? Salary { get; set; }
	public string? Location { get; set; }
	public string? Note { get; set; }
	public string? Source { get; set; }
	public JobStatus Status { get; set; } = JobStatus.Applied;
}
