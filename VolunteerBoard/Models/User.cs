using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VolunteerBoardAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }

        [ForeignKey("PostedById")]
        public virtual ICollection<Job> PostedJobs { get; } = new List<Job>();
        [ForeignKey("AcceptedById")]
        public virtual ICollection<Job> AcceptedJobs { get; } = new List<Job>();        
    }
}
