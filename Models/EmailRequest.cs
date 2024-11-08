namespace RecruitmentAPI.Models;

public class EmailRequest
{
  public required string ToEmail { get; set; }
  public required string Subject { get; set; }
  public required string Message { get; set; }
}