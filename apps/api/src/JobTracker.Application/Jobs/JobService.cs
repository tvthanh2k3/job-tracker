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

    public async Task<IEnumerable<JobDto>> GetAllJobsAsync()
    {
        var jobs = await _unitOfWork.Repository<Job>().GetAllAsync(isTracking: false);
        return _mapper.Map<IEnumerable<JobDto>>(jobs);
    }

    public async Task<JobDto?> GetJobByIdAsync(Guid id)
    {
        var job = await _unitOfWork.Repository<Job>().GetByIdAsync(id);
        return job == null ? null : _mapper.Map<JobDto>(job);
    }

    public async Task<JobDto> CreateJobAsync(CreateJobDto createJobDto)
    {
        var job = _mapper.Map<Job>(createJobDto);
        
        await _unitOfWork.Repository<Job>().AddAsync(job);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<JobDto>(job);
    }

    public async Task<bool> UpdateJobAsync(Guid id, UpdateJobDto updateJobDto)
    {
        var existingJob = await _unitOfWork.Repository<Job>().GetByIdAsync(id);
        if (existingJob == null) return false;

        // Map values from DTO to existing entity
        _mapper.Map(updateJobDto, existingJob);
        existingJob.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Repository<Job>().Update(existingJob);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteJobAsync(Guid id)
    {
        var job = await _unitOfWork.Repository<Job>().GetByIdAsync(id);
        if (job == null) return false;

        _unitOfWork.Repository<Job>().Remove(job);
        var result = await _unitOfWork.SaveChangesAsync();

        return result > 0;
    }
}
