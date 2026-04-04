using JobTracker.Application.Users.Dto;

namespace JobTracker.Application.Users;

/// <summary>
/// Interface for managing user-related business operations.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Gets a specific user by its unique identifier.
    /// </summary>
    /// <param name="id">The user identifier.</param>
    /// <returns>The UserDto if found; otherwise, null.</returns>
    Task<UserDto?> GetUserByIdAsync(Guid id);

    /// <summary>
    /// Creates a new user profile.
    /// </summary>
    /// <param name="createUserDto">The user data.</param>
    /// <returns>The created UserDto.</returns>
    Task<UserDto> CreateUserAsync(CreateUserDto createUserDto);

    /// <summary>
    /// Updates an existing user profile.
    /// </summary>
    /// <param name="id">The user identifier.</param>
    /// <param name="updateUserDto">The updated user data.</param>
    /// <returns>True if update was successful; otherwise, false.</returns>
    Task<bool> UpdateUserAsync(Guid id, UpdateUserDto updateUserDto);

    /// <summary>
    /// Deletes a user profile.
    /// </summary>
    /// <param name="id">The user identifier.</param>
    /// <returns>True if deletion was successful; otherwise, false.</returns>
    Task<bool> DeleteUserAsync(Guid id);
}
