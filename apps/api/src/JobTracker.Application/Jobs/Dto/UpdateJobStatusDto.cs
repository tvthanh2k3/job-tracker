using JobTracker.Domain.Enums;

namespace JobTracker.Application.Jobs.Dto;

public class UpdateJobStatusDto
{
    public JobStatus Status { get; set; }
}
