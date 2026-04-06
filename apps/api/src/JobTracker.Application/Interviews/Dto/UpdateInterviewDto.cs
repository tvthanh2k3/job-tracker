namespace JobTracker.Application.Interviews.Dto;

public class UpdateInterviewDto
{
    public DateTime ScheduledAt { get; set; }
    public string Round { get; set; } = string.Empty;
    public string? Notes { get; set; }
}
