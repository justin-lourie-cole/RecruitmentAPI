using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Services;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace RecruitmentAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class S3Controller : ControllerBase
{
  private readonly S3Service _s3Service;

  public S3Controller(S3Service s3Service)
  {
    _s3Service = s3Service;
  }

  public class FileUploadModel
  {
    [Required]
    public required IFormFile File { get; set; }
  }

  [HttpPost("upload")]
  [Consumes("multipart/form-data")]
  public async Task<IActionResult> UploadFile([FromForm] FileUploadModel model)
  {
    if (model.File == null || model.File.Length == 0)
    {
      return BadRequest("No file uploaded");
    }

    try
    {
      using var stream = model.File.OpenReadStream();
      var fileName = $"{Guid.NewGuid()}-{model.File.FileName}";
      var url = await _s3Service.UploadFileAsync(stream, fileName);
      return Ok(new { url });
    }
    catch (Exception ex)
    {
      return BadRequest(new { error = ex.Message });
    }
  }
}
