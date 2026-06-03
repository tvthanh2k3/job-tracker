using FluentAssertions;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace JobTracker.IntegrationTests.Jobs;

public class JobsAuthorizationTests : IntegrationTestBase
{
	[Fact]
	public async Task Jobs_UserB_CannotAccess_UserAJob()
	{
		// Arrange - User A tạo job
		var tokenA = await LoginAsync($"userA_{Guid.NewGuid():N}@example.com");

		var createRequest = new HttpRequestMessage(HttpMethod.Post, "/api/jobs");
		createRequest.Content = JsonContent.Create(new { Title = "User A Job", Company = "Company A" });
		createRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", tokenA);

		var createResponse = await Client.SendAsync(createRequest);
		createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
		var body = await createResponse.Content.ReadFromJsonAsync<JsonElement>();
		var jobId = body.GetProperty("id").GetString();

		// Arrange - User B đăng nhập
		var tokenB = await LoginAsync($"userB_{Guid.NewGuid():N}@example.com");

		// Act + Assert - User B GET → 404
		var getRequest = new HttpRequestMessage(HttpMethod.Get, $"/api/jobs/{jobId}");
		getRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", tokenB);
		var getResponse = await Client.SendAsync(getRequest);
		getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);

		// Act + Assert - User B PUT → 404
		var putRequest = new HttpRequestMessage(HttpMethod.Put, $"/api/jobs/{jobId}");
		putRequest.Content = JsonContent.Create(new { Title = "Hacked", Company = "Hacked", Status = 0, RemoteStatus = 0 });
		putRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", tokenB);
		var putResponse = await Client.SendAsync(putRequest);
		putResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);

		// Act + Assert - User B DELETE → 404
		var deleteRequest = new HttpRequestMessage(HttpMethod.Delete, $"/api/jobs/{jobId}");
		deleteRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", tokenB);
		var deleteResponse = await Client.SendAsync(deleteRequest);
		deleteResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}
}
