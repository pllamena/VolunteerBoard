using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VolunteerBoardAPI.Models
{
    public class Job
    {
        [Key]
        public int JobId { get; set; }
        public int PostedById { get; set; }
        public virtual User PostedBy { get; set; }
        public int? AcceptedById { get; set; }
        public virtual User AcceptedBy { get; set; }
        public string Description { get; set; }
        public string Zip { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
