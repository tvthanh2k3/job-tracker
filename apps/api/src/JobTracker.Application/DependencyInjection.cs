using System.Reflection;
using FluentValidation;
using JobTracker.Application.Jobs;
using JobTracker.Application.Users;
using JobTracker.Application.Interviews;
using Microsoft.Extensions.DependencyInjection;

namespace JobTracker.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register AutoMapper
        services.AddAutoMapper(cfg => cfg.AddMaps(Assembly.GetExecutingAssembly()));

        // Register FluentValidation
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // Register Business Services
        services.AddScoped<IJobService, JobService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IInterviewService, InterviewService>();

        return services;
    }
}
