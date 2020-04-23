using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VolunteerBoardAPI.Models;

namespace VolunteerBoardAPI.Migrations
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User() { UserId = 1, Email = "plamena.mineva.scholz@gmail.com", Name = "Plamena" });
            modelBuilder.Entity<Job>().HasData(
                new Job() { JobId = 1, PostedById = 1, CreatedOn = DateTime.Now, Description = "Test 1", Zip = "16511" },
                new Job() { JobId = 2, PostedById = 1, CreatedOn = DateTime.Now, Description = "Test 2", Zip = "16428" },
                new Job() { JobId = 3, PostedById = 1, CreatedOn = DateTime.Now, Description = "Test 3", Zip = "45365" }
                );
        }
    }
}
