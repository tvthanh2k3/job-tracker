using AutoMapper;
using JobTracker.Application.Jobs.Dto;
using JobTracker.Domain.Entities;
using JobTracker.Domain.Interfaces;

namespace JobTracker.Application.Jobs;

/// <summary>
/// Implementation of IJobService to handle business logic for Job entity.
/// </summary>
public class JobService : IJobService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public JobService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<JobDto>> GetAllJobsAsync(Guid userId)
    {
        var jobs = await _unitOfWork.Repository<Job>().GetAllAsync(j => j.UserId == userId, isTracking: false);
        return _mapper.Map<IEnumerable<JobDto>>(jobs);
    }

    public async Task<JobDto?> GetJobByIdAsync(Guid id, Guid userId)
    {
        var job = await _unitOfWork.Repository<Job>().GetByIdAsync(id);

        if (job == null || job.UserId != userId) return null;

        return _mapper.Map<JobDto>(job);
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto createJobDto, Guid userId)
    {
        var job = _mapper.Map<Job>(createJobDto);

        job.UserId = userId;

        await _unitOfWork.Repository<Job>().AddAsync(job);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<JobDto>(job);
    }

    public async Task<bool> UpdateJobAsync(Guid id, UpdateJobDto updateJobDto, Guid userId)
    {
        var existingJob = await _unitOfWork.Repository<Job>().GetByIdAsync(id);

        if (existingJob == null || existingJob.UserId != userId) return false;

        _mapper.Map(updateJobDto, existingJob);
        existingJob.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Repository<Job>().Update(existingJob);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteJobAsync(Guid id, Guid userId)
    {
        var job = await _unitOfWork.Repository<Job>().GetByIdAsync(id);

        if (job == null || job.UserId != userId) return false;

        _unitOfWork.Repository<Job>().Remove(job);
        var result = await _unitOfWork.SaveChangesAsync();

        return result > 0;
    }
}
