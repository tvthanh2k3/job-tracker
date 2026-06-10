using JobTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace JobTracker.Infrastructure.Data.Configurations;

public class JobConfiguration : IEntityTypeConfiguration<Job>
{
    public void Configure(EntityTypeBuilder<Job> builder)
    {
        builder.ToTable("Jobs");

        builder.HasKey(j => j.Id);

        builder.Property(j => j.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(j => j.Company)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(j => j.Status)
            .HasConversion<string>()
            .HasMaxLength(50);

        builder.Property(j => j.Salary)
            .HasMaxLength(100);

        builder.Property(j => j.Location)
            .HasMaxLength(200);

        builder.Property(j => j.Source)
            .HasMaxLength(200);

        builder.HasIndex(j => j.UserId);
        builder.HasIndex(j => new { j.UserId, j.Status });

        builder.HasMany(j => j.Interviews)
            .WithOne(i => i.Job)
            .HasForeignKey(i => i.JobId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
