using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Services;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<RecruitmentDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Add services to the container
builder.Services.AddControllers(); // Add support for API controllers
builder.Services.AddEndpointsApiExplorer(); // Add API explorer for endpoint documentation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "RecruitmentAPI", Version = "v1" });
    
    // Configure Swagger to handle file uploads
    c.MapType<IFormFile>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });
});
builder.Services.AddScoped<S3Service>();
builder.Services.AddScoped<SQSService>();
builder.Services.AddScoped<EmailService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Redirect HTTP to HTTPS
app.UseAuthorization(); // Enable authorization
app.MapControllers(); // Map controller endpoints

app.Run();

