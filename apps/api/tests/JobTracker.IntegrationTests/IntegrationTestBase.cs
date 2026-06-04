using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using System.Text.Json;
using Testcontainers.PostgreSql;

namespace JobTracker.IntegrationTests;

public class IntegrationTestBase : IAsyncLifetime
{
	private readonly PostgreSqlContainer _dbContainer = new PostgreSqlBuilder("postgres:16")
		.WithDatabase("jobtracker_test")
		.WithUsername("postgres")
		.WithPassword("postgres")
		.Build();

	protected HttpClient Client { get; private set; } = null!;
	private WebApplicationFactory<Program> _factory = null!;

	protected async Task<string> LoginAsync(string email, string password = "password123")
	{
		var registerDto = new { FullName = "Test User", Email = email, Password = password };
		await Client.PostAsJsonAsync("/api/auth/register", registerDto);

		var loginDto = new { Email = email, Password = password };
		var loginResponse = await Client.PostAsJsonAsync("/api/auth/login", loginDto);
		var loginResult = await loginResponse.Content.ReadFromJsonAsync<JsonElement>();
		return loginResult.GetProperty("token").GetString()!;
	}

	public async Task InitializeAsync()
	{
		await _dbContainer.StartAsync();

		// WithWebHostBuilder.ConfigureAppConfiguration fires too late in the minimal hosting model.
		Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", _dbContainer.GetConnectionString());

		_factory = new WebApplicationFactory<Program>();

		Client = _factory.CreateClient(new WebApplicationFactoryClientOptions
		{
			AllowAutoRedirect = false
		});
	}

	public async Task DisposeAsync()
	{
		await _factory.DisposeAsync();
		await _dbContainer.StopAsync();
		Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", null);
	}
}
