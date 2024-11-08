using RecruitmentAPI.Models;

namespace RecruitmentAPI.Data;

public static class DbInitializer
{
    public static void Initialize(RecruitmentDbContext context)
    {
        // Ensure database is created
        context.Database.EnsureCreated();

        // Check if we already have jobs
        if (context.Jobs.Any())
        {
            return;   // DB has been seeded
        }

        var jobs = new Job[]
        {
            new Job
            {
                Title = "Senior Software Engineer",
                Description = "Looking for an experienced developer with strong skills in .NET and cloud technologies.",
                Location = "Sydney, Australia",
                Salary = 150000M,
                DatePosted = DateTime.UtcNow.AddDays(-5)
            },
            new Job
            {
                Title = "Frontend Developer",
                Description = "React developer needed for an exciting fintech project.",
                Location = "Melbourne, Australia",
                Salary = 110000M,
                DatePosted = DateTime.UtcNow.AddDays(-3)
            },
            new Job
            {
                Title = "DevOps Engineer",
                Description = "AWS certified engineer needed to manage our cloud infrastructure.",
                Location = "Brisbane, Australia",
                Salary = 130000M,
                DatePosted = DateTime.UtcNow.AddDays(-1)
            }
        };

        context.Jobs.AddRange(jobs);
        context.SaveChanges();
    }
} 