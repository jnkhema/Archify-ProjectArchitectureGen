using Microsoft.AspNetCore.Mvc;
using ProjArchiGenerator.Data;
using ProjArchiGenerator.DTOs;
using ProjArchiGenerator.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;


namespace ProjArchiGenerator.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class AuthController : ControllerBase 
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDtO dto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            var hashedPwd = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = hashedPwd,
                CreatedAt = DateTime.Now
            };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDtO dto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(x => x.Value.Errors.Count > 0)
                                       .Select(x => new
                                       {
                                           Field = x.Key,
                                           Errors = x.Value.Errors.Select(e => e.ErrorMessage)
                                       });
                return BadRequest(new
                {
                    message = "Validation failed",
                    errors
                });
            }
            dto.Email = dto.Email.Trim();
            dto.Password = dto.Password.Trim();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }
            bool isPwdValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            if (!isPwdValid)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(new
            {
                message = "Login successful",
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Email
                }
            });
            HttpContext.Session.SetString("UserId", user.Id.ToString());
        }
    }
}
