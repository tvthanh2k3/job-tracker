using FluentAssertions;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace JobTracker.IntegrationTests.Jobs;

[Collection("Integration")]
public class JobsCrudTests : IntegrationTestBase
{
	[Fact]
	public async Task JobCrud_CreateListUpdateDelete_Success()
	{
		// Arrange
		var email = $"jobs_{Guid.NewGuid():N}@example.com";
		var token = await LoginAsync(email);
		Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

		// Act - Create
		var createDto = new { Title = "Software Engineer", Company = "Acme Corp" };
		var createResponse = await Client.PostAsJsonAsync("/api/jobs", createDto);

		// Assert - Create
		createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
		var createdJob = await createResponse.Content.ReadFromJsonAsync<JsonElement>();
		var jobId = createdJob.GetProperty("id").GetString();

		// Act + Assert - GET list
		var listResponse = await Client.GetAsync("/api/jobs");
		listResponse.StatusCode.Should().Be(HttpStatusCode.OK);
		var jobs = await listResponse.Content.ReadFromJsonAsync<JsonElement>();
		jobs.EnumerateArray().Should().Contain(j => j.GetProperty("id").GetString() == jobId);

		// Act + Assert - PUT update
		var updateDto = new { Title = "Senior Engineer", Company = "Acme Corp", Status = 0, RemoteStatus = 0 };
		var updateResponse = await Client.PutAsJsonAsync($"/api/jobs/{jobId}", updateDto);
		updateResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

		// Act + Assert - DELETE
		var deleteResponse = await Client.DeleteAsync($"/api/jobs/{jobId}");
		deleteResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

		// Act + Assert - GET after delete
		var getAfterDelete = await Client.GetAsync($"/api/jobs/{jobId}");
		getAfterDelete.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}
}
