using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VolunteerBoardAPI.Migrations;

namespace VolunteerBoardAPI.Models
{
    public class VolunteerBoardContext : DbContext
    {
        public VolunteerBoardContext(DbContextOptions<VolunteerBoardContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(x => x.UserId);

                entity.Property(p => p.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(p => p.Email)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasMany(p => p.PostedJobs)
                    .WithOne(d => d.PostedBy)
                    .HasForeignKey(d => d.PostedById);

                entity.HasMany(p => p.AcceptedJobs)
                    .WithOne(d => d.AcceptedBy)
                    .HasForeignKey(d => d.AcceptedById);
            });
            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(x => x.JobId);

                entity.Property(p => p.Description)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Seed();
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Job> Jobs { get; set; }
    }
}