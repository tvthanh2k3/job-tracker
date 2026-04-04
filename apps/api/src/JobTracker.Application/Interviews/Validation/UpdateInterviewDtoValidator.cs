using FluentValidation;
using JobTracker.Application.Interviews.Dto;

namespace JobTracker.Application.Interviews.Validation;

public class UpdateInterviewDtoValidator : AbstractValidator<UpdateInterviewDto>
{
    public UpdateInterviewDtoValidator()
    {
        RuleFor(x => x.ScheduledAt)
            .NotEmpty().WithMessage("Scheduled time is required.");

        RuleFor(x => x.Round)
            .NotEmpty().WithMessage("Round title is required.")
            .MaximumLength(100).WithMessage("Round title must not exceed 100 characters.");
    }
}
