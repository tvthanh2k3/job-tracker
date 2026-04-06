using JobTracker.Api;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container by calling the Installer
builder.Services.InstallServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
