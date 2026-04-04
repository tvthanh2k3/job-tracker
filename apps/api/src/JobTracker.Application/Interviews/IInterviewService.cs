using JobTracker.Application.Interviews.Dto;

namespace JobTracker.Application.Interviews;

/// <summary>
/// Interface for managing interview-related business operations.
/// </summary>
public interface IInterviewService
{
    /// <summary>
    /// Gets all interviews for a specific job.
    /// </summary>
    /// <param name="jobId">The job identifier.</param>
    /// <returns>A collection of InterviewDto.</returns>
    Task<IEnumerable<InterviewDto>> GetInterviewsByJobIdAsync(Guid jobId);

    /// <summary>
    /// Gets a specific interview by its unique identifier.
    /// </summary>
    /// <param name="id">The interview identifier.</param>
    /// <returns>The InterviewDto if found; otherwise, null.</returns>
    Task<InterviewDto?> GetInterviewByIdAsync(Guid id);

    /// <summary>
    /// Creates a new interview record.
    /// </summary>
    /// <param name="createInterviewDto">The interview data.</param>
    /// <returns>The created InterviewDto.</returns>
    Task<InterviewDto> CreateInterviewAsync(CreateInterviewDto createInterviewDto);

    /// <summary>
    /// Updates an existing interview record.
    /// </summary>
    /// <param name="id">The interview identifier.</param>
    /// <param name="updateInterviewDto">The updated interview data.</param>
    /// <returns>True if update was successful; otherwise, false.</returns>
    Task<bool> UpdateInterviewAsync(Guid id, UpdateInterviewDto updateInterviewDto);

    /// <summary>
    /// Deletes an interview record.
    /// </summary>
    /// <param name="id">The interview identifier.</param>
    /// <returns>True if deletion was successful; otherwise, false.</returns>
    Task<bool> DeleteInterviewAsync(Guid id);
}
