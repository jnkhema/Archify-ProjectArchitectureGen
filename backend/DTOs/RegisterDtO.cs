using System.ComponentModel.DataAnnotations;

namespace ProjArchiGenerator.DTOs
{
    public class RegisterDtO
    {

        [Required(ErrorMessage ="Name is required")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is Required")]
        [EmailAddress(ErrorMessage = "Invalid Email Format")]
        [MaxLength(100, ErrorMessage = "Email cannot exceed more than 100 characters")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is Required")]
        [MinLength(6, ErrorMessage = "Password must be atleast 6 characters")]
        [MaxLength(50, ErrorMessage = "Password cannot exceed more than 50 characters")]
        public string Password { get; set; } = string.Empty;
    }
}
