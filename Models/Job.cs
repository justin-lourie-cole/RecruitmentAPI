using System.ComponentModel.DataAnnotations;

namespace RecruitmentAPI.Models;

public class Job
{
  public int Id { get; set; }
  [Required] public required string Title { get; set; }
  [Required] public required string Description { get; set; }
  public DateTime DatePosted { get; set; } = DateTime.UtcNow;
}