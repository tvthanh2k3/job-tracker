using FluentAssertions;
using JobTracker.Application.Jobs.Dto;
using JobTracker.Application.Jobs.Validation;

namespace JobTracker.UnitTests.Validators;

public class CreateJobDtoValidatorTests
{
	private readonly CreateJobDtoValidator _validator = new CreateJobDtoValidator();

	[Fact]
	public void Validate_ValidData_ReturnsValid()
	{
		var dto = new CreateJobDto
		{
			Title = "Software Engineer",
			Company = "Google"
		};

		var result = _validator.Validate(dto);

		result.IsValid.Should().BeTrue();
	}

	[Fact]
	public void Validate_EmptyTitle_ReturnsInvalid()
	{
		var dto = new CreateJobDto
		{
			Title = "",
			Company = "Google"
		};

		var result = _validator.Validate(dto);

		result.IsValid.Should().BeFalse();
	}

	[Fact]
	public void Validate_SalaryMinGreaterThanMax_ReturnsInvalid()
	{
		var dto = new CreateJobDto
		{
			Title = "Software Engineer",
			Company = "Google",
			SalaryMin = 1000,
			SalaryMax = 500
		};

		var result = _validator.Validate(dto);

		result.IsValid.Should().BeFalse();
	}
}
