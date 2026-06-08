using JobTracker.Api;
using JobTracker.Api.Middleware;
using JobTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container by calling the Installer
builder.Services.InstallServices(builder.Configuration);
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

// Run migrations and seed data
await app.InitializeDatabaseAsync();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.AddPreferredSecuritySchemes("Bearer");
        options.AddHttpAuthentication("Bearer", auth =>
        {
            auth.Token = "";
        });
    });

    // HTTPS redirection only in Development — in production, TLS is terminated
    // at the infrastructure level (Azure App Service, nginx reverse proxy)
    app.UseHttpsRedirection();
}

app.UseExceptionHandler();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
