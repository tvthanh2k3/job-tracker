using JobTracker.Domain.Entities;

namespace JobTracker.Application.Auth;

/// <summary>
/// Interface for JWT token generation service.
/// </summary>
public interface IJwtTokenService
{
    string GenerateToken(User user);
}
