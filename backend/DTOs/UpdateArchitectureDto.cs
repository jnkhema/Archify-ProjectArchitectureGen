using System.ComponentModel.DataAnnotations;

namespace ProjArchiGenerator.DTOs
{
    public class UpdateArchitectureDto
    {
        [Required]
        public string ProjectTitle { get; set; }

        public string ProjectDescription { get; set; }

        [Required]
        [RegularExpression("^(Tier1|Tier2|NTier)$")]
        public string ArchitectureLevel { get; set; }

        [Required]
        public string Prompt { get; set; }
    }
}