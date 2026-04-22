using FluentValidation;
using JobTracker.Application.Jobs.Dto;

namespace JobTracker.Application.Jobs.Validation;

/// <summary>
/// Validator for UpdateJobDto to ensure data integrity during job updates.
/// </summary>
public class UpdateJobDtoValidator : AbstractValidator<UpdateJobDto>
{
    public UpdateJobDtoValidator()
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

        RuleFor(x => x.SalaryMin)
            .GreaterThanOrEqualTo(0).WithMessage("Minimum salary must be greater than or equal to 0.");

        RuleFor(x => x.SalaryMax)
            .GreaterThanOrEqualTo(x => x.SalaryMin ?? 0)
            .WithMessage("Maximum salary must be greater than or equal to minimum salary.");
    }
}
