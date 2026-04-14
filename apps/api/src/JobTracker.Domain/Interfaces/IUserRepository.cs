using JobTracker.Domain.Entities;

namespace JobTracker.Domain.Interfaces;

/// <summary>
/// Specialized repository for User entity with role-aware query methods.
/// </summary>
public interface IUserRepository : IGenericRepository<User>
{
    /// <summary>
    /// Gets a user by ID including their roles.
    /// </summary>
    Task<User?> GetUserWithRolesAsync(Guid id);

    /// <summary>
    /// Gets a user by email including their roles.
    /// </summary>
    Task<User?> GetUserByEmailWithRolesAsync(string email);
}
