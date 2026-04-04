using AutoMapper;
using JobTracker.Application.Jobs.Dto;
using JobTracker.Domain.Entities;

namespace JobTracker.Application.Jobs.Mapping;

public class JobMappingProfile : Profile
{
    public JobMappingProfile()
    {
        CreateMap<Job, JobDto>();
        CreateMap<CreateJobDto, Job>();
        CreateMap<UpdateJobDto, Job>();
    }
}
