namespace JobTracker.Application.Interviews.Dto
{
    public class CreateInterviewDto
    {
        public Guid JobId { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Round { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
