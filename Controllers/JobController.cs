using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Models;

[ApiController]
[Route("api/[controller]")]
// [Authorize]
public class JobController : ControllerBase
{
    private readonly RecruitmentDbContext _context;

    public JobController(RecruitmentDbContext context)
    {
        _context = context;
    }

    // GET: api/jobs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
    {
        return await _context.Jobs.ToListAsync();
    }

    // POST: api/jobs
    [HttpPost]
    public async Task<ActionResult<Job>> PostJob(Job job)
    {
        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetJobs), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutJob(int id, Job job)
    {
        if (id != job.Id)
        {
            return BadRequest();
        }

        _context.Entry(job).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Jobs.Any(e => e.Id == id))
            {
                return NotFound();
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        var job = await _context.Jobs.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        _context.Jobs.Remove(job);
        await _context.SaveChangesAsync();

        return NoContent();
    }
} 