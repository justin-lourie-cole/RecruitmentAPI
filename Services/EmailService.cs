// Services/EmailService.cs
using SendGrid;
using SendGrid.Helpers.Mail;

namespace RecruitmentAPI.Services;

public class EmailService
{
  private readonly SendGridClient _client;
  private readonly string _fromEmail;

  public EmailService(IConfiguration configuration)
  {
    string apiKey = configuration["SendGrid:ApiKey"] 
        ?? throw new ArgumentException("SendGrid API key must be configured");
    _fromEmail = configuration["SendGrid:FromEmail"] 
        ?? throw new ArgumentException("SendGrid from email must be configured");
    _client = new SendGridClient(apiKey);
  }

  public async Task SendEmailAsync(string toEmail, string subject, string message)
  {
    var msg = new SendGridMessage()
    {
      From = new EmailAddress(_fromEmail, "Recruitment App"),
      Subject = subject,
      PlainTextContent = message
    };
    msg.AddTo(new EmailAddress(toEmail));
    await _client.SendEmailAsync(msg);
  }
}
