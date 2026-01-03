FULLSTACK TODO APPLICATION WITH AI ASSISTANT

A modern fullstack Todo application built with React (Vite) on the frontend and Django REST Framework on the backend. The app allows users to manage tasks efficiently, organize them by projects, and leverage an AI-powered assistant (Gemini) to intelligently break down tasks into actionable subtasks.

FEATURES
1.  Authentication & Authorization:
    - Secure user login and token-based authentication.
2.  Project-based Task Management:
    - Create projects and manage tasks under each project
3.  AI Task Breakdown:
    - Use an AI assistant to automatically generate subtasks from a high-level task.
4.  Manual Task Creation:
    - Add tasks without AI when you want full control.
5.  Task Progress Tracking
    - Visual indicators for task intensity and duration.
6.  REST API
    - Clean, scalable backend API using Django REST Framework.
7.  Fast Frontend
    - Built with React + Vite

TECH STACK
Frontend:
    - React
    - Vite
    - Axios
    - CSS
Backend:
    - Django
    - Django REST Framework
    - JWT Authentication
    - Google Gemini AI API
Database:
    - SQLite (development)

SETUP INSTRUCTIONS
1.  Clone the Repository
2.  Backend Setup (Django):
    python -m venv env
    env\Script\activate
3.  Create a .env file:
    GENAI_API_KEY = your_gemini_api_key
    SECRET_KEY = your_django_secret_key
4.  Frontend Setup (React)
    npm install
    npm run dev

AI ASSISTANT
The AI Assistant Google Gemini models to:
    - Break down large tasks into multiple subtasks.
    - Regenerate tasks with improved clarity.
    - Keep responses short, actionable, and user-friendly.

GITIGNORE
Ensure these are never pushed to GitHub, include in .gitignore:
    - .env
    - node_modules/
    - env/ (virtual environment)

FUTURE IMPROVEMENT
    - Role-based collaboration
    - Analytics dashboard
    - Desktop and email notification reminders at the start and end of each day.

AUTHOR
Ayomide Segun
Fullstack Developer (React & Django)
GitHub: @Ayomide-Segun
