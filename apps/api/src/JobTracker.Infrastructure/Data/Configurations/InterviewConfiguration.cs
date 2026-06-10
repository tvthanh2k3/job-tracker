using JobTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobTracker.Infrastructure.Data.Configurations;

public class InterviewConfiguration : IEntityTypeConfiguration<Interview>
{
    public void Configure(EntityTypeBuilder<Interview> builder)
    {
        builder.ToTable("Interviews");

        builder.HasKey(i => i.Id);

        builder.Property(i => i.Round)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(i => i.Status)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.HasIndex(i => i.JobId);
    }
}
