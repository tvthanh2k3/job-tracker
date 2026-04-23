using JobTracker.Application.Jobs.Dto;

namespace JobTracker.Application.Jobs;

/// <summary>
/// Interface for managing job-related business operations.
/// </summary>
public interface IJobService
{
    /// <summary>
    /// Gets a list of all jobs for the currently authenticated user.
    /// </summary>
    /// <param name="userId">The authenticated user's identifier.</param>
    /// <returns>A collection of JobDto.</returns>
    Task<IEnumerable<JobDto>> GetAllJobsAsync(Guid userId);

    /// <summary>
    /// Gets a specific job by its unique identifier, only if it belongs to the given user.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <param name="userId">The authenticated user's identifier.</param>
    /// <returns>The JobDto if found and owned by the user; otherwise, null.</returns>
    Task<JobDto?> GetJobByIdAsync(Guid id, Guid userId);

    /// <summary>
    /// Creates a new job application for the authenticated user.
    /// </summary>
    /// <param name="createJobDto">The job data.</param>
    /// <param name="userId">The authenticated user's identifier.</param>
    /// <returns>The created JobDto.</returns>
    Task<JobDto> CreateJobAsync(CreateJobDto createJobDto, Guid userId);

    /// <summary>
    /// Updates an existing job application, only if it belongs to the given user.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <param name="updateJobDto">The updated job data.</param>
    /// <param name="userId">The authenticated user's identifier.</param>
    /// <returns>True if update was successful; false if not found or not owned by user.</returns>
    Task<bool> UpdateJobAsync(Guid id, UpdateJobDto updateJobDto, Guid userId);

    /// <summary>
    /// Deletes a job application, only if it belongs to the given user.
    /// </summary>
    /// <param name="id">The job identifier.</param>
    /// <param name="userId">The authenticated user's identifier.</param>
    /// <returns>True if deletion was successful; false if not found or not owned by user.</returns>
    Task<bool> DeleteJobAsync(Guid id, Guid userId);
}
