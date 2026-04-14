using JobTracker.Application.Users;
using JobTracker.Application.Users.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null) return NotFound();
        
        return Ok(user);
    }

    [Authorize(Policy = "SuperAdminOnly")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto createUserDto)
    {
        var result = await _userService.CreateUserAsync(createUserDto);
        
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [Authorize(Policy = "SuperAdminOnly")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDto updateUserDto)
    {
        var success = await _userService.UpdateUserAsync(id, updateUserDto);
        if (!success) return NotFound();

        return NoContent();
    }

    [Authorize(Policy = "SuperAdminOnly")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _userService.DeleteUserAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}
