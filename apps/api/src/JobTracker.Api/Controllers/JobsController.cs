using JobTracker.Application.Jobs;
using JobTracker.Application.Jobs.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobTracker.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

	/// <summary>
	/// Get the user ID of the logged-in user from the JWT token.
	/// </summary>
	private Guid? GetCurrentUserId()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            return null;

        return userId;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var jobs = await _jobService.GetAllJobsAsync(userId.Value);
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var job = await _jobService.GetJobByIdAsync(id, userId.Value);
        if (job == null) return NotFound();

        return Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobDto createJobDto)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var result = await _jobService.CreateJobAsync(createJobDto, userId.Value);

        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateJobDto updateJobDto)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _jobService.UpdateJobAsync(id, updateJobDto, userId.Value);
        if (!success) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _jobService.DeleteJobAsync(id, userId.Value);
        if (!success) return NotFound();

        return NoContent();
    }
}
