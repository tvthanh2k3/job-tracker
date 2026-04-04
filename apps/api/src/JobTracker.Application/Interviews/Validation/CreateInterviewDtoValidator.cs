using FluentValidation;
using JobTracker.Application.Interviews.Dto;

namespace JobTracker.Application.Interviews.Validation;

public class CreateInterviewDtoValidator : AbstractValidator<CreateInterviewDto>
{
    public CreateInterviewDtoValidator()
    {
        RuleFor(x => x.JobId)
            .NotEmpty().WithMessage("JobId is required.");

        RuleFor(x => x.ScheduledAt)
            .NotEmpty().WithMessage("Scheduled time is required.")
            .Must(date => date >= DateTime.UtcNow).WithMessage("Scheduled time must be in the future.");

        RuleFor(x => x.Round)
            .NotEmpty().WithMessage("Round title is required.")
            .MaximumLength(100).WithMessage("Round title must not exceed 100 characters.");
    }
}
