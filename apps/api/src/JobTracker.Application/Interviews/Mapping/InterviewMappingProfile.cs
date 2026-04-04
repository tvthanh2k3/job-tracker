using AutoMapper;
using JobTracker.Application.Interviews.Dto;
using JobTracker.Domain.Entities;

namespace JobTracker.Application.Interviews.Mapping;

public class InterviewMappingProfile : Profile
{
    public InterviewMappingProfile()
    {
        CreateMap<Interview, InterviewDto>();
        CreateMap<CreateInterviewDto, Interview>();
        CreateMap<UpdateInterviewDto, Interview>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
}
