namespace JobTracker.Application.Interviews.Dto
{
    public class InterviewDto
    {
        public Guid Id { get; set; }
        public Guid JobId { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Round { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
