using AutoMapper;
using JobTracker.Application.Users.Dto;
using JobTracker.Domain.Entities;
using JobTracker.Domain.Interfaces;
using BCrypt.Net;

namespace JobTracker.Application.Users;

/// <summary>
/// Implementation of IUserService to handle business logic for User entity.
/// </summary>
public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUnitOfWork unitOfWork, IUserRepository userRepository, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserDto?> GetUserByIdAsync(Guid id)
    {
        var user = await _userRepository.GetUserWithRolesAsync(id);
        return user == null ? null : _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto)
    {
        var user = _mapper.Map<User>(createUserDto);
        
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password);

        await _unitOfWork.Repository<User>().AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<UserDto>(user);
    }

    public async Task<bool> UpdateUserAsync(Guid id, UpdateUserDto updateUserDto)
    {
        var existingUser = await _userRepository.GetUserWithRolesAsync(id);
        if (existingUser == null) return false;

        _mapper.Map(updateUserDto, existingUser);
        existingUser.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Repository<User>().Update(existingUser);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteUserAsync(Guid id)
    {
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(id);
        if (user == null) return false;

        _unitOfWork.Repository<User>().Remove(user);
        var result = await _unitOfWork.SaveChangesAsync();

        return result > 0;
    }
}
