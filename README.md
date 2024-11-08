# Recruitment API

A modern .NET-based recruitment management system that streamlines the hiring process. This API provides endpoints for managing job postings, candidate applications, interview scheduling, and automated communication workflows. Built with AWS services for scalability and reliability, it features secure document storage, asynchronous processing for background checks, and automated email notifications.

Key capabilities:

- Job posting management and candidate tracking
- Secure document handling with AWS S3
- Automated email communications via SendGrid
- Background task processing with AWS SQS
- RESTful API design with comprehensive Swagger documentation

## Technologies Used

- .NET 8.0
- AWS Services:
- Amazon S3
- Amazon SQS
- Entity Framework Core 8.0
- PostgreSQL (via Npgsql)
- SendGrid
- Swagger/OpenAPI

## Prerequisites

- .NET 8.0 SDK
- PostgreSQL database
- AWS account with appropriate credentials
- SendGrid account (for email functionality)

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
```

2. Configure your environment variables:
   - AWS credentials
   - Database connection string
   - SendGrid API key

3. Run the migrations:

```bash
dotnet ef database update
```

4. Start the application:

```bash
dotnet run
```

The API will be available at `https://localhost:5001` with Swagger documentation at `/swagger`.

## Project Structure

- `Controllers/` - API endpoints
- `Models/` - Data models and DTOs
- `Services/` - Business logic and external service integrations
- `Data/` - Database context and configurations

## API Documentation

API documentation is available via Swagger UI when running the application.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your PR:

- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed
- Describes the changes in detail

## License

This project is licensed under the MIT License - see below for details:

```text
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
