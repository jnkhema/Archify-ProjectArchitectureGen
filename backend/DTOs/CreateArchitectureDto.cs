using System.ComponentModel.DataAnnotations;

namespace ProjArchiGenerator.DTOs
{
    public class CreateArchitectureDto
    {
        [Required(ErrorMessage = "Project title is required")]
        public string ProjectTitle { get; set; }
        [Required]
        public string ProjectDescription { get; set; }

        [Required(ErrorMessage = "Architecture level is required")]
        [RegularExpression("^(Tier1|Tier2|NTier)$",
            ErrorMessage = "Must be Tier1, Tier2 or NTier")]
        public string ArchitectureLevel { get; set; }

        [Required(ErrorMessage = "Prompt is required")]
        [MinLength(10, ErrorMessage = "Prompt must be at least 10 characters")]
        public string Prompt { get; set; }
    }
}