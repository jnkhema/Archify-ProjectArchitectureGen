using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjArchiGenerator.Data;
using ProjArchiGenerator.DTOs;
using ProjArchiGenerator.Models;
using ProjArchiGenerator.Models.AI;


namespace ProjArchiGenerator.Controllers
{

    [ServiceFilter(typeof(AuthFilters))]
    [ApiController]
    [Route("api/[controller]")]
    
    public class ArchitectureController : ControllerBase

    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly AIService _aiService;
       
        public ArchitectureController(ApplicationDbContext context,IConfiguration config, AIService aiService)
        {
            _context = context;
            _config = config;
            _aiService = aiService;
           
        }
        private int GetUserId()
        {
            var userIdHeader = Request.Headers["userId"].FirstOrDefault();
            if (string.IsNullOrEmpty(userIdHeader))
                return 0;
            return int.Parse(userIdHeader);
        }


        [HttpPost("generate")]
       
        public async Task<IActionResult> Generate(CreateArchitectureDto request)
        {

            int userId = GetUserId();
            
            if (userId == 0)
            {
                return Unauthorized("User not found");
            }
            
            var techStack = "Angular + ASP.NET Core + SQL Server";

            
            var finalPrompt = $@" You are a software architect.
                Generate a clean and well-structured architecture blueprint.
 
                Project Title: {request.ProjectTitle}
                Description: {request.ProjectDescription}
                Architecture Level: {request.ArchitectureLevel}
                Tech Stack: Angular + ASP.NET Core + SQL Server
 
                User Requirements:
                {request.Prompt}

                Important: 
                -Use clear headings
                -Use bullet points
                -Keep formatting neat
                -Do not mix sections
                -Do not generate broken text
 
                Include:
                1. System Architecture
                2. Database Schema
                3. API Endpoints
                4. Folder Structure (Frontend + Backend)
                5. Authentication Strategy
                ";

            
            var generatedOutput = await _aiService.GenerateArchitectureAsync(finalPrompt);

            
            var architecture = new ProjectArchitecture
            {
                UserId = userId,
                ProjectTitle = request.ProjectTitle,
                ProjectDescription = request.ProjectDescription,
                ArchitectureLevel = request.ArchitectureLevel,
                Prompt = request.Prompt,
                TechStack = techStack,
                GeneratedBlueprint = generatedOutput,
                CreatedAt = DateTime.UtcNow
            };

            await _context.ProjectArchitecture.AddAsync(architecture);
            await _context.SaveChangesAsync();

           
            return Ok(architecture);
        }

        [HttpGet("my-projects")]
        public async Task<IActionResult> GetMyProjects()
        {
            
            int userId = GetUserId();
            if (userId == 0)
            {
                return Unauthorized("User not found");
            }
            var projects = await _context.ProjectArchitecture.Where(p => p.UserId == userId)
                                                             .OrderByDescending(p => p.CreatedAt)
                                                             .Select(p => new
                                                             {
                                                                 p.ArchitectureId,
                                                                 p.ProjectTitle,
                                                                 p.ArchitectureLevel,
                                                                 p.CreatedAt
                                                             }).ToListAsync();
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectsById(int id)
        {
            int userId = GetUserId();
           
            if (userId == 0)
            {
                return Unauthorized("User not found");
            }
            var project = await _context.ProjectArchitecture.Where(p => p.ArchitectureId == id && p.UserId == userId).Select(p => new
            {
                p.ArchitectureId,
                p.ProjectTitle,
                p.ProjectDescription,
                p.ArchitectureLevel,
                p.Prompt,
                p.GeneratedBlueprint,
                p.CreatedAt
            })
                .FirstOrDefaultAsync();

            if (project == null)
            {
                return NotFound(new
                {
                    message = "Project not found"
                });
            }
            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            int userId = GetUserId();
            if (userId == 0)
            {
                return Unauthorized("User not found");
            }
            var project = await _context.ProjectArchitecture.FirstOrDefaultAsync(p => p.ArchitectureId == id && p.UserId == userId);
            if(project == null)
            {
                return NotFound(new { Message = "Project not found" });
            }

            _context.ProjectArchitecture.Remove(project);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Project deleted successfully" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] UpdateArchitectureDto request)
        {
            int userId = GetUserId();
            if (userId == 0)
            {
                return Unauthorized("User not found");
            }
            var project = await _context.ProjectArchitecture.FirstOrDefaultAsync(p => p.ArchitectureId == id && p.UserId == userId);

            if(project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            project.ProjectTitle = request.ProjectTitle;
            project.ProjectDescription = request.ProjectDescription;
            project.ArchitectureLevel = request.ArchitectureLevel;
            project.Prompt = request.Prompt;

            var finalPrompt = $@" You are a software architect.
                Generate a clean and well-structured architecture blueprint.
 
                Project Title: {request.ProjectTitle}
                Description: {request.ProjectDescription}
                Architecture Level: {request.ArchitectureLevel}
                Tech Stack: Angular + ASP.NET Core + SQL Server
 
                User Requirements:
                {request.Prompt}

                Important: 
                -Use clear headings
                -Use bullet points
                -Keep formatting neat
                -Do not mix sections
                -Do not generate broken text
 
                Include:
                1. System Architecture
                2. Database Schema
                3. API Endpoints
                4. Folder Structure (Frontend + Backend)
                5. Authentication Strategy
                ";
            var aiResponse = await _aiService.GenerateArchitectureAsync(finalPrompt);
            project.GeneratedBlueprint = aiResponse;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Project Updated Successfully" });


        } 

    }
}
