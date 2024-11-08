using System.ComponentModel.DataAnnotations;

namespace RecruitmentAPI.Models;

public class Candidate
{
  public int Id { get; set; }
  [Required] public required string Name { get; set; }
  [Required, EmailAddress] public required string Email { get; set; }
  public required string ResumeUrl { get; set; }
}

