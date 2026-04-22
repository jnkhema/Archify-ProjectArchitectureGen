using ProjArchiGenerator.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjArchiGenerator.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ProjectArchitecture> ProjectArchitecture { get; set; }
    }
}
