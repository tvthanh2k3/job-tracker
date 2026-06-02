using FluentAssertions;
using JobTracker.Application.Auth.Dto;
using JobTracker.Application.Auth.Validation;

namespace JobTracker.UnitTests.Validators
{
	public class RegisterDtoValidatorTests
	{
		private readonly RegisterDtoValidator _validator = new RegisterDtoValidator();

		[Fact]
		public void Validate_ValidData_ReturnsValid()
		{
			var dto = new RegisterDto
			{
				FullName = "Test User",
				Email = "test@example.com",
				Password = "password123"
			};

			var result = _validator.Validate(dto);

			result.IsValid.Should().BeTrue();
		}

		[Fact]
		public void Validate_InvalidEmail_ReturnsInvalid()
		{
			var dto = new RegisterDto
			{
				FullName = "Test User",
				Email = "notanemail",
				Password = "password123"
			};

			var result = _validator.Validate(dto);

			result.IsValid.Should().BeFalse();
		}

		[Fact]
		public void Validate_ShortPassword_ReturnsInvalid()
		{
			var dto = new RegisterDto
			{
				FullName = "Test User",
				Email = "test@example.com",
				Password = "123"
			};

			var result = _validator.Validate(dto);

			result.IsValid.Should().BeFalse();
		}
	}
}
