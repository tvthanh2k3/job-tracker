using JobTracker.Application.Users.Dto;

namespace JobTracker.Application.Auth.Dto;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
}
