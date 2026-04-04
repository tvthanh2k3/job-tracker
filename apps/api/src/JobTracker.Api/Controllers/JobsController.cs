using JobTracker.Application.Jobs;
using JobTracker.Application.Jobs.Dto;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var jobs = await _jobService.GetAllJobsAsync();
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var job = await _jobService.GetJobByIdAsync(id);
        if (job == null) return NotFound();
        
        return Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobDto createJobDto)
    {
        var result = await _jobService.CreateJobAsync(createJobDto);
        
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateJobDto updateJobDto)
    {
        var success = await _jobService.UpdateJobAsync(id, updateJobDto);
        if (!success) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _jobService.DeleteJobAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}
