using JobTracker.Application.Auth.Dto;
using JobTracker.Application.Users.Dto;

namespace JobTracker.Application.Auth;

/// <summary>
/// Interface for Authentication Service providing Registration, Login and GetMe methods.
/// </summary>
public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto?> LoginAsync(LoginDto loginDto);
    Task<UserDto?> GetMeAsync(Guid userId);
}
