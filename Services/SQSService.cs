using Amazon.Extensions.NETCore.Setup;
using Amazon.SQS;
using Amazon.SQS.Model;

namespace RecruitmentAPI.Services;

public class SQSService
  {
  private readonly IAmazonSQS _sqsClient;
  private readonly string _queueUrl;

  public SQSService(IConfiguration configuration)
  {
    var awsOptions = configuration.GetSection("AWS").Get<AWSOptions>()
        ?? throw new ArgumentException("AWS configuration is missing");
    _sqsClient = new AmazonSQSClient(
        awsOptions.Credentials,
        Amazon.RegionEndpoint.APSouth1
    );
    _queueUrl = configuration["AWS:SQSQueueUrl"] 
        ?? throw new ArgumentException("SQS Queue URL must be configured");
  }

  public async Task SendMessageAsync(string message)
  {
    var sendMessageRequest = new SendMessageRequest
    {
      QueueUrl = _queueUrl,
      MessageBody = message
    };
    
    await _sqsClient.SendMessageAsync(sendMessageRequest);
  }
}
