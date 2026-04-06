using JobTracker.Application.Interviews;
using JobTracker.Application.Interviews.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InterviewsController : ControllerBase
{
    private readonly IInterviewService _interviewService;

    public InterviewsController(IInterviewService interviewService)
    {
        _interviewService = interviewService;
    }

    [HttpGet("job/{jobId}")]
    public async Task<IActionResult> GetByJobId(Guid jobId)
    {
        var interviews = await _interviewService.GetInterviewsByJobIdAsync(jobId);
        return Ok(interviews);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var interview = await _interviewService.GetInterviewByIdAsync(id);
        if (interview == null) return NotFound();
        
        return Ok(interview);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInterviewDto createInterviewDto)
    {
        var result = await _interviewService.CreateInterviewAsync(createInterviewDto);
        
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateInterviewDto updateInterviewDto)
    {
        var success = await _interviewService.UpdateInterviewAsync(id, updateInterviewDto);
        if (!success) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _interviewService.DeleteInterviewAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}
