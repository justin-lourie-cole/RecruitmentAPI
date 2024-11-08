using Amazon.S3;
using Amazon.S3.Transfer;

namespace RecruitmentAPI.Services;

public class S3Service
{
  private readonly IAmazonS3 _s3Client;
  private readonly string _bucketName;

  public S3Service(IConfiguration configuration)
  {
    var awsConfig = new AmazonS3Config
    {
      RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(configuration["AWS:Region"] ?? "us-east-1")
    };
    
    _s3Client = new AmazonS3Client(awsConfig);
    _bucketName = configuration["AWS:S3Bucket"] ?? 
        throw new ArgumentException("AWS:S3Bucket configuration is required");
  }

  public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
  {
    var fileTransferUtility = new TransferUtility(_s3Client);
    await fileTransferUtility.UploadAsync(fileStream, _bucketName, fileName);
    return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
  }
}
