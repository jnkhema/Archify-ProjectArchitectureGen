using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace ProjArchiGenerator.Models
{
    public class ProjectArchitecture
    {
        [Key]
        public int ArchitectureId {  get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public string TechStack { get; set; } = "Angular + ASP.NET Core + SQL Server";
        [Required]

        public string Prompt { get; set; } = string.Empty;
        [Required]
        public string ArchitectureLevel { get; set; } = string.Empty;

        public string GeneratedBlueprint {  get; set; }
        public DateTime CreatedAt {  get; set; } = DateTime.UtcNow;
        [ForeignKey("UserId")]
        public User User { get; set; }


    }
}
