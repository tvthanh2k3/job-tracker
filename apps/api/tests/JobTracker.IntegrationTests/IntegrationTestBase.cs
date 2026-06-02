using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
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

	public async Task InitializeAsync()
	{
		await _dbContainer.StartAsync();  // spin up Postgres container

		_factory = new WebApplicationFactory<Program>()
			.WithWebHostBuilder(builder =>
			{
				builder.ConfigureAppConfiguration((context, config) =>
				{
					config.AddInMemoryCollection(new Dictionary<string, string?>
					{
						["ConnectionStrings:DefaultConnection"] = _dbContainer.GetConnectionString(),
						["JwtSettings:Secret"] = "integration-test-secret-key-minimum-32-chars!!",
						["JwtSettings:Issuer"] = "JobTracker.Api",
						["JwtSettings:Audience"] = "JobTracker.Web",
						["JwtSettings:ExpiryMinutes"] = "60",
						["AllowedOrigins:0"] = "http://localhost:5173"
					});
				});
			});

		Client = _factory.CreateClient(new WebApplicationFactoryClientOptions
		{
			AllowAutoRedirect = false
		});
	}

	public async Task DisposeAsync()
	{
		await _factory.DisposeAsync();
		await _dbContainer.StopAsync();
	}
}
