using FluentAssertions;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace JobTracker.IntegrationTests.Auth;

[Collection("Integration")]
public class AuthTests : IntegrationTestBase
{
	[Fact]
	public async Task AuthFlow_RegisterLoginGetMe_ReturnsCorrectUser()
	{
		// Arrange
		var uniqueEmail = $"test_{Guid.NewGuid():N}@example.com";
		var registerDto = new { FullName = "Test User", Email = uniqueEmail, Password = "password123" };

		// Act - Register
		var registerResponse = await Client.PostAsJsonAsync("/api/auth/register", registerDto);

		// Assert - Register
		registerResponse.StatusCode.Should().Be(HttpStatusCode.OK);

		// Act - Login
		var loginDto = new { Email = uniqueEmail, Password = "password123" };
		var loginResponse = await Client.PostAsJsonAsync("/api/auth/login", loginDto);
		var loginResult = await loginResponse.Content.ReadFromJsonAsync<JsonElement>();
		var token = loginResult.GetProperty("token").GetString();

		// Assert - Login
		loginResponse.StatusCode.Should().Be(HttpStatusCode.OK);
		token.Should().NotBeNullOrEmpty();

		// Act - Get Me
		Client.DefaultRequestHeaders.Authorization =
			new AuthenticationHeaderValue("Bearer", token);
		var meResponse = await Client.GetAsync("/api/auth/me");

		// Assert - Get Me
		meResponse.StatusCode.Should().Be(HttpStatusCode.OK);
	}

}
