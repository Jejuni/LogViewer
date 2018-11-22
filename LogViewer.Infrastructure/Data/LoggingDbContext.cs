using System;
using LogViewer.Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LogViewer.Infrastructure.Data
{
    public partial class LoggingDbContext : DbContext
    {
        public LoggingDbContext()
        {
        }

        public LoggingDbContext(DbContextOptions<LoggingDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Application> Application { get; set; }
        public virtual DbSet<LogEntry> LogEntry { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<LogEntry>(entity =>
            {
                entity.HasIndex(e => new { e.ApplicationId, e.EntryTime })
                    .HasName("IDX_ApplicationId_EntryTime");

                entity.HasIndex(e => new { e.EntryTime, e.LogLevel })
                    .HasName("IDX_EntryTime_LogLevel");

                entity.Property(e => e.LogLevel)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Logger).HasMaxLength(150);

                entity.Property(e => e.Message).IsRequired();

                entity.HasOne(d => d.Application)
                    .WithMany(p => p.LogEntry)
                    .HasForeignKey(d => d.ApplicationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LogEntry_Application");
            });
        }
    }
}
