using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Services;

namespace RecruitmentAPI.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly RecruitmentDbContext _context;

        public AuthController(AuthService authService, RecruitmentDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        public class LoginRequest
            {
            public required string Username { get; set; }
            public required string Password { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Constant for dummy password hash for non-existent users
            const string DUMMY_HASH = "$2a$11$K3g6XoYMBiK6FSZxhanN8.Mn9m8hLe4BCFqxL0mq8o/FuY6/y0vFe";

            // Check if the user exists in the database
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            // Use dummy hash if the user does not exist
            var passwordHash = user?.PasswordHash ?? DUMMY_HASH;

            // Verify the password
            var isValid = _authService.VerifyPassword(request.Password, passwordHash);

            // Simulate a delay to make timing attacks harder
            await Task.Delay(Random.Shared.Next(100, 2000));

            // Return unauthorized if the credentials are invalid
            if (user == null || !isValid)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Generate a JWT token for the user
            var token = _authService.GenerateJwtToken(user);

            // Return the token in the response
            return Ok(new { token });
        }
    }
}
