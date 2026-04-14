using JobTracker.Domain.Entities;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Infrastructure.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(JobTrackerDbContext context)
    {
        // 1. Seed Roles
        if (!await context.Roles.AnyAsync())
        {
            var superAdminRole = new Role
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "SuperAdmin",
                Description = "System Administrator with full access",
                CreatedAt = DateTime.UtcNow
            };
            
            var userRole = new Role
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "User",
                Description = "Regular User",
                CreatedAt = DateTime.UtcNow
            };

            await context.Roles.AddRangeAsync(superAdminRole, userRole);
        }

        // 2. Seed Users
        if (!await context.Users.AnyAsync())
        {
            var superAdmin = new User
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                FullName = "Super Administrator",
                Email = "superadmin@jobtracker.dev",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("SuperAdmin@123"),
                CreatedAt = DateTime.UtcNow
            };

            var regularUser = new User
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000002"),
                FullName = "Default User",
                Email = "user@jobtracker.dev",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("User@123456"),
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddRangeAsync(superAdmin, regularUser);

            // 3. Assign Roles to Users
            var superAdminUserRole = new UserRole
            {
                UserId = superAdmin.Id,
                RoleId = Guid.Parse("11111111-1111-1111-1111-111111111111")
            };

            var regularUserUserRole = new UserRole
            {
                UserId = regularUser.Id,
                RoleId = Guid.Parse("22222222-2222-2222-2222-222222222222")
            };

            await context.UserRoles.AddRangeAsync(superAdminUserRole, regularUserUserRole);
        }

        // Only save changes if anything was added
        if (context.ChangeTracker.HasChanges())
        {
            await context.SaveChangesAsync();
        }
    }
}
