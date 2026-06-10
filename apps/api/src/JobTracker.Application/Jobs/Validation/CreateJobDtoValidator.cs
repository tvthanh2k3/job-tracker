using FluentValidation;
using JobTracker.Application.Jobs.Dto;

namespace JobTracker.Application.Jobs.Validation;

/// <summary>
/// Validator for CreateJobDto to ensure data integrity during job creation.
/// </summary>
public class CreateJobDtoValidator : AbstractValidator<CreateJobDto>
{
    public CreateJobDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

        RuleFor(x => x.Company)
            .NotEmpty().WithMessage("Company name is required.")
            .MaximumLength(200).WithMessage("Company name must not exceed 200 characters.");

        RuleFor(x => x.Url)
            .Must(uri => string.IsNullOrEmpty(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
            .WithMessage("Invalid URL format.");

    }
}
