using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Plant_Watering_System_Backend.Models
{
    public class Plant
    {
        [Key]
        public int id { get; set; }

        [Required]
        [Column(TypeName ="nvarchar(100)")]
        public string name { get; set; }

        public DateTime lastWateredTime { get; set; }

        public int wateringStatus { get; set; }

    }
}
