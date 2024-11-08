using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Services;
using RecruitmentAPI.Models;

namespace RecruitmentAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmailController : ControllerBase
{
  private readonly EmailService _emailService;

  public EmailController(EmailService emailService)
  {
    _emailService = emailService;
  }

  [HttpPost("send-email")]
  public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
  {
    try{
      await _emailService.SendEmailAsync(request.ToEmail, request.Subject, request.Message);
      return Ok(new { message = "Email sent successfully" });
    }
    catch (Exception ex)
    {
      return BadRequest(new { error = ex.Message });
    }
  }
}
