using FluentValidation;
using JobTracker.Application.Auth.Dto;

namespace JobTracker.Application.Auth.Validation;

public class LoginDtoValidator : AbstractValidator<LoginDto>
{
    public LoginDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("A valid email is required.");
            
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");
    }
}
