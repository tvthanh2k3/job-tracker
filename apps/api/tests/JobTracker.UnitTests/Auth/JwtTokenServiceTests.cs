using FluentAssertions;
using JobTracker.Domain.Entities;
using JobTracker.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using NSubstitute;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JobTracker.UnitTests.Auth;

public class JwtTokenServiceTests
{
	private readonly JwtTokenService _jwtTokenService;

	public JwtTokenServiceTests()
	{
		var configuration = Substitute.For<IConfiguration>();
		var jwtSection = Substitute.For<IConfigurationSection>();

		jwtSection["Secret"].Returns("super-secret-key-for-testing-only-1234");
		jwtSection["Issuer"].Returns("TestIssuer");
		jwtSection["Audience"].Returns("TestAudience");
		jwtSection["ExpiryMinutes"].Returns("60");

		configuration.GetSection("JwtSettings").Returns(jwtSection);
		_jwtTokenService = new JwtTokenService(configuration);
	}

	[Fact]
	public void GenerateToken_ValidUser_ContainsCorrectClaims()
	{
		// Arrange
		var user = new User
		{
			Id = Guid.NewGuid(),
			FullName = "Test User",
			Email = "test@example.com",
			UserRoles = new List<UserRole>
			{
				new UserRole { Role = new Role { Name = "User" } }
			}
		};

		// Act
		var token = _jwtTokenService.GenerateToken(user);

		// Assert
		var handler = new JwtSecurityTokenHandler();
		var decodedToken = handler.ReadJwtToken(token);

		decodedToken.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value
			.Should().Be(user.Id.ToString());
		decodedToken.Claims.First(c => c.Type == ClaimTypes.Email).Value
			.Should().Be(user.Email);
		decodedToken.Claims.First(c => c.Type == ClaimTypes.Name).Value
			.Should().Be(user.FullName);
	}
}
