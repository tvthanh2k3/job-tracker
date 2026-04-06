namespace JobTracker.Application.Users.Dto;

public class UpdateUserDto
{
	public string FullName { get; set; } = string.Empty;
	public string? AvatarUrl { get; set; }
}
