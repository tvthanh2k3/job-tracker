using AutoMapper;
using FluentAssertions;
using JobTracker.Application.Jobs;
using JobTracker.Application.Jobs.Dto;
using JobTracker.Domain.Entities;
using JobTracker.Domain.Interfaces;
using NSubstitute;

namespace JobTracker.UnitTests.Jobs
{
	public class JobServiceTests
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly JobService _jobService;

		public JobServiceTests()
		{
			_unitOfWork = Substitute.For<IUnitOfWork>();
			_mapper = Substitute.For<IMapper>();
			_jobService = new JobService(_unitOfWork, _mapper);
		}

		[Fact]
		public async Task CreateJobAsync_AssignsCorrectUserId()
		{
			// Arrange
			var userId = Guid.NewGuid();
			var createJobDto = new CreateJobDto { Title = "Dev", Company = "Google" };
			var job = new Job();

			_mapper.Map<Job>(createJobDto).Returns(job);
			_mapper.Map<JobDto>(job).Returns(new JobDto());

			// Act
			await _jobService.CreateJobAsync(createJobDto, userId);

			// Assert
			job.UserId.Should().Be(userId);
		}

		[Fact]
		public async Task GetJobByIdAsync_DifferentUser_ReturnsNull()
		{
			// Arrange
			var ownerUserId = Guid.NewGuid();
			var otherUserId = Guid.NewGuid();
			var jobId = Guid.NewGuid();

			var job = new Job { Id = jobId, UserId = ownerUserId };

			_unitOfWork.Repository<Job>().GetByIdAsync(jobId).Returns(job);

			// Act
			var result = await _jobService.GetJobByIdAsync(jobId, otherUserId);

			// Assert
			result.Should().BeNull();
		}

		[Fact]
		public async Task UpdateJobAsync_DifferentUser_ReturnsFalse()
		{
			// Arrange
			var ownerUserId = Guid.NewGuid();
			var otherUserId = Guid.NewGuid();
			var jobId = Guid.NewGuid();

			var job = new Job { Id = jobId, UserId = ownerUserId };

			_unitOfWork.Repository<Job>().GetByIdAsync(jobId).Returns(job);

			// Act
			var result = await _jobService.UpdateJobAsync(jobId, new UpdateJobDto(), otherUserId);

			// Assert
			result.Should().BeFalse();
		}

		[Fact]
		public async Task DeleteJobAsync_DifferentUser_ReturnsFalse()
		{
			// Arrange
			var ownerUserId = Guid.NewGuid();
			var otherUserId = Guid.NewGuid();
			var jobId = Guid.NewGuid();

			var job = new Job { Id = jobId, UserId = ownerUserId };

			_unitOfWork.Repository<Job>().GetByIdAsync(jobId).Returns(job);

			// Act
			var result = await _jobService.DeleteJobAsync(jobId, otherUserId);

			// Assert
			result.Should().BeFalse();
		}
	}
}
