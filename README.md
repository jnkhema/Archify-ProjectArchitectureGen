# Archify - Design, Visualize, Build.
 
## About The Project
Archify is an AI-Powered Software Architecture Generator, which will transform a basic project idea into a structured software design blueprint. The system will generate recommended architecture, database schema, API endpoints, authentication strategy, folder structure. This application generates the architecture blueprints based on a fixed texh stack - **Angular + ASP.NET Core + SQL Server** ensuring consistency in the generated blueprint.
 
## Tech Stack
- **Frontend:** Angular 19
- **Backend:** ASP.NET Core (.NET 8)
- **Database:** SQL Server
- **AI Model:** llama-3.3-70b-versatile (via Groq API)
- **ORM:** Entity Framework Core
 
## Features
- User Authentication (Register/Login with BCrypt password hashing)
- Generate AI-powered architecture blueprints
- View, Edit and Delete saved projects
- Sidebar dashboard showing all past projects
- Secure API with userId header authentication
 
## API Endpoints
- `POST /api/Auth/register` - Register new user
- `POST /api/Auth/login` - Login
- `POST /api/Architecture/generate` - Generate blueprint
- `GET /api/Architecture/my-projects` - Get all projects
- `GET /api/Architecture/{id}` - Get project by ID
- `PUT /api/Architecture/{id}` - Update project
- `DELETE /api/Architecture/{id}` - Delete project
 
## Architecture Levels Supported
- **Tier 1** - Basic single tier architecture
- **Tier 2** - Two tier client-server architecture
- **N-Tier** - Multi-layered enterprise architecture

## Output Images
### Login Page
<p align="center"><img width="800" height="500" alt="Screenshot 2026-04-22 180147" src="https://github.com/user-attachments/assets/07bae92e-8e87-46f4-a7c6-4e98b81b852b" /></p>  
  
### Generate Architecture
<p align="center"><img width="800" height="500" alt="Screenshot 2026-04-22 180322" src="https://github.com/user-attachments/assets/7880bdf3-8b5f-4ec2-b906-93a83c4daed0" /></p> 
  
### Generated Architecture
<p align="center"><img width="800" height="500" alt="Screenshot 2026-04-22 180704" src="https://github.com/user-attachments/assets/97abcabf-b078-414a-b5bd-efe495970ddb" /></p>  
  
### Update Architecture
<p align="center"><img width="800" height="500" alt="Screenshot 2026-04-22 180720" src="https://github.com/user-attachments/assets/4fc8aa44-cdd9-4bd6-9f9b-85d8d1afe2c6" /></p>  


