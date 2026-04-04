using AutoMapper;
using JobTracker.Application.Interviews.Dto;
using JobTracker.Domain.Entities;
using JobTracker.Domain.Interfaces;

namespace JobTracker.Application.Interviews;

/// <summary>
/// Implementation of IInterviewService to handle business logic for Interview entity.
/// </summary>
public class InterviewService : IInterviewService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public InterviewService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<InterviewDto>> GetInterviewsByJobIdAsync(Guid jobId)
    {
        var interviews = await _unitOfWork.Repository<Interview>()
            .GetAllAsync(i => i.JobId == jobId, isTracking: false);
        return _mapper.Map<IEnumerable<InterviewDto>>(interviews);
    }

    public async Task<InterviewDto?> GetInterviewByIdAsync(Guid id)
    {
        var interview = await _unitOfWork.Repository<Interview>().GetByIdAsync(id);
        return interview == null ? null : _mapper.Map<InterviewDto>(interview);
    }

    public async Task<InterviewDto> CreateInterviewAsync(CreateInterviewDto createInterviewDto)
    {
        var interview = _mapper.Map<Interview>(createInterviewDto);
        
        await _unitOfWork.Repository<Interview>().AddAsync(interview);
        await _unitOfWork.SaveChangesAsync();

        return _mapper.Map<InterviewDto>(interview);
    }

    public async Task<bool> UpdateInterviewAsync(Guid id, UpdateInterviewDto updateInterviewDto)
    {
        var existingInterview = await _unitOfWork.Repository<Interview>().GetByIdAsync(id);
        if (existingInterview == null) return false;

        _mapper.Map(updateInterviewDto, existingInterview);
        existingInterview.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Repository<Interview>().Update(existingInterview);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteInterviewAsync(Guid id)
    {
        var interview = await _unitOfWork.Repository<Interview>().GetByIdAsync(id);
        if (interview == null) return false;

        _unitOfWork.Repository<Interview>().Remove(interview);
        var result = await _unitOfWork.SaveChangesAsync();

        return result > 0;
    }
}
