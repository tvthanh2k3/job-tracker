using AutoMapper;
using FluentAssertions;
using JobTracker.Application.Auth;
using JobTracker.Application.Auth.Dto;
using JobTracker.Application.Users.Dto;
using JobTracker.Domain.Entities;
using JobTracker.Domain.Exceptions;
using JobTracker.Domain.Interfaces;
using NSubstitute;

namespace JobTracker.UnitTests.Auth
{
	public class AuthServiceTests
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IUserRepository _userRepository;
		private readonly IJwtTokenService _jwtTokenService;
		private readonly IMapper _mapper;
		private readonly AuthService _authService;

		public AuthServiceTests()
		{
			_unitOfWork = Substitute.For<IUnitOfWork>();
			_userRepository = Substitute.For<IUserRepository>();
			_jwtTokenService = Substitute.For<IJwtTokenService>();
			_mapper = Substitute.For<IMapper>();

			_authService = new AuthService(_unitOfWork, _userRepository, _jwtTokenService, _mapper);
		}

		[Fact]
		public async Task RegisterAsync_DuplicateEmail_ThrowsConflictException()
		{
			var registerDto = new RegisterDto
			{
				FullName = "Test User",
				Email = "test@example.com",
				Password = "password123",
			};

			var existingUser = new User { Email = "test@example.com" };

			_unitOfWork.Repository<User>()
				.GetFirstOrDefaultAsync(Arg.Any<System.Linq.Expressions.Expression<Func<User, bool>>>())
				.Returns(existingUser);

			// Act
			var act = async () => await _authService.RegisterAsync(registerDto);

			// Assert
			await act.Should().ThrowAsync<ConflictException>();
		}

		[Fact]
		public async Task LoginAsync_WrongPassword_ReturnsNull()
		{
			// Arrange
			var loginDto = new LoginDto { Email = "test@example.com", Password = "wrongpassword" };

			var user = new User
			{
				Id = Guid.NewGuid(),
				Email = "test@example.com",
				PasswordHash = BCrypt.Net.BCrypt.HashPassword("correctpassword")
			};

			_userRepository.GetUserByEmailWithRolesAsync(loginDto.Email).Returns(user);

			// Act
			var result = await _authService.LoginAsync(loginDto);

			// Assert
			result.Should().BeNull();
		}

		[Fact]
		public async Task LoginAsync_ValidCredentials_ReturnsAuthResponseDto()
		{
			// Arrange
			const string password = "password123";
			const string token = "generated.jwt.token";

			var loginDto = new LoginDto { Email = "test@example.com", Password = password };

			var user = new User
			{
				Id = Guid.NewGuid(),
				Email = "test@example.com",
				FullName = "Test User",
				PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
			};

			var userDto = new UserDto { Id = user.Id, Email = user.Email, FullName = user.FullName };

			_userRepository.GetUserByEmailWithRolesAsync(loginDto.Email).Returns(user);
			_jwtTokenService.GenerateToken(user).Returns(token);
			_mapper.Map<UserDto>(user).Returns(userDto);

			// Act
			var result = await _authService.LoginAsync(loginDto);

			// Assert
			result.Should().NotBeNull();
			result!.Token.Should().Be(token);
			result.User.Email.Should().Be(loginDto.Email);
		}
	}
}
