# Todo List Application

A full-stack To-Do List application built with React, Node.js, and TypeScript. This application allows users to create, update, and delete tasks with a modern, responsive dark-themed UI.

## Features

- **Home Page**: Displays a list of all tasks with their names and status (Complete/Incomplete)
- **Add Task Page**: Form to create new tasks with name, description, and status
- **Task Detail Page**: View, update, and delete individual tasks
- **Mark Tasks**: Toggle tasks between Complete and Incomplete status
- **Delete Tasks**: Remove tasks from the list
- **RESTful API**: Backend API built with Express.js and TypeScript
- **Responsive Design**: Works on all screen sizes
- **Dark Theme**: Modern dark-themed UI matching the design specifications

## Tech Stack

- **Frontend**: React 19, TypeScript, React Router
- **Backend**: Node.js, Express.js, TypeScript
- **Styling**: CSS (Dark theme)
- **Build Tool**: Vite

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd "todo-list app"
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

## Running the Application

### Development Mode

You need to run both the frontend and backend servers:

1. **Start the backend server** (from the `server` directory):
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:3001`

2. **Start the frontend development server** (from the root directory):
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

3. Open your browser and navigate to the frontend URL (usually `http://localhost:5173`)

### Production Build

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Build the backend**:
   ```bash
   cd server
   npm run build
   ```

3. **Start the backend**:
   ```bash
   npm start
   ```

## Project Structure

```
todo-list app/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Home page displaying all tasks
│   │   ├── Home.css          # Styles for Home page
│   │   ├── AddTask.tsx       # Add new task page
│   │   ├── AddTask.css       # Styles for AddTask page
│   │   ├── TaskDetail.tsx    # Task detail/edit page
│   │   └── TaskDetail.css    # Styles for TaskDetail page
│   ├── api.ts                # API client functions
│   ├── types.ts              # TypeScript type definitions
│   ├── App.tsx               # Main app component with routing
│   └── main.tsx              # Entry point
├── server/
│   └── src/
│       ├── index.ts          # Express server setup and routes
│       └── types.ts           # Backend type definitions
└── package.json
```

## API Endpoints

The backend provides the following RESTful API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **View Tasks**: The home page displays all tasks with their status
2. **Add Task**: Click "Add Todo" button to navigate to the Add Task page
3. **Mark Complete/Incomplete**: Click the checkbox icon on any task card
4. **View/Edit Task**: Click the "View" button on any task card
5. **Update Task**: On the task detail page, modify the title or description and click "UPDATE"
6. **Delete Task**: On the task detail page, click the "DELETE" button

## Requirements Met

✅ Two pages - Home page and Add Task page  
✅ Home page displays task name and status  
✅ Users can mark tasks as complete or incomplete  
✅ Users can delete tasks  
✅ Add Task page has a form for task name and status  
✅ RESTful API for data requests  
✅ All code written in TypeScript  
✅ Frontend built with React  
✅ Backend built with Node.js  
✅ Responsive design for all screen sizes  
✅ Styled using CSS with dark theme  

## Deployment

The application can be deployed to platforms like:
- **Frontend**: Netlify, Vercel, or any static hosting service
- **Backend**: Heroku, Railway, Render, or any Node.js hosting service

Make sure to update the `API_BASE_URL` in `src/api.ts` to point to your deployed backend URL.

## License

This project is created for technical evaluation purposes.
