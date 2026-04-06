using JobTracker.Application.Jobs.Dto;

namespace JobTracker.Application.Jobs;

/// <summary>
/// Interface for managing job-related business operations.
/// </summary>
public interface IJobService
{
    /// <summary>
    /// Gets a list of all jobs for a specific user.
    /// </summary>
    /// <param name="userId">The user identifier.</param>
    /// <returns>A collection of JobDto.</returns>
    Task<IEnumerable<JobDto>> GetAllJobsAsync(Guid userId);

    /// <summary>
    /// Gets a specific job by its unique identifier.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <returns>The JobDto if found; otherwise, null.</returns>
    Task<JobDto?> GetJobByIdAsync(Guid id);

    /// <summary>
    /// Creates a new job application.
    /// </summary>
    /// <param name="createJobDto">The job data.</param>
    /// <returns>The created JobDto.</returns>
    Task<JobDto> CreateJobAsync(CreateJobDto createJobDto);

    /// <summary>
    /// Updates an existing job application.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <param name="updateJobDto">The updated job data.</param>
    /// <returns>True if update was successful; otherwise, false.</returns>
    Task<bool> UpdateJobAsync(Guid id, UpdateJobDto updateJobDto);

    /// <summary>
    /// Deletes a job application.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <returns>True if deletion was successful; otherwise, false.</returns>
    Task<bool> DeleteJobAsync(Guid id);
}
