using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Services;

namespace RecruitmentAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SQSController : ControllerBase
{
  private readonly SQSService _sqsService;

  public SQSController(SQSService sqsService)
  {
    _sqsService = sqsService;
  }

  [HttpPost("send-message")]
  public async Task<IActionResult> SendMessage([FromBody] string message)
  {
    try
    {
      await _sqsService.SendMessageAsync(message);
      return Ok(new { message = "Message sent successfully" });
    }
    catch (Exception ex)
    {
      return BadRequest(new { error = ex.Message });
    }
  }
}
