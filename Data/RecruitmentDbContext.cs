using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Models;

namespace RecruitmentAPI.Data;

public class RecruitmentDbContext(DbContextOptions<RecruitmentDbContext> options) : DbContext(options)
{
  public DbSet<Job> Jobs { get; set; }
  public DbSet<Candidate> Candidates { get; set; }
  public DbSet<User> Users { get; set; }
}
