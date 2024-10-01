# Task Management App

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive design with Tailwind CSS
- RESTful API backend

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- State Management: React Hooks
- HTTP Client: Axios

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14.0.0 or later)
- MongoDB installed and running
- Git installed

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create a .env file in the backend directory and add your MongoDB connection string:

   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

5. Start the backend server:

   ```bash
   cd ../backend
   npm start
   ```

6. In a new terminal, start the frontend development server:

   ```bash
   cd ../frontend
   npm start
   ```

7. Open your browser and visit `http://localhost:3000` to see the app running.

## API Endpoints

- GET /api/tasks - Fetch all tasks
- POST /api/tasks - Create a new task
- GET /api/tasks/:id - Fetch a specific task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task
