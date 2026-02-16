import express, { Request, Response } from 'express';
import cors from 'cors';
import { Task } from './types.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage (in production, use a database)
let tasks: Task[] = [
  {
    id: '1',
    name: 'Sample Task 1',
    status: 'Incomplete',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: '2',
    name: 'Sample Task 2',
    status: 'Complete',
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

// GET all tasks
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// GET single task by ID
app.get('/api/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST create new task
app.post('/api/tasks', (req: Request, res: Response) => {
  const { name, status, description } = req.body;
  
  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  if (status !== 'Complete' && status !== 'Incomplete') {
    return res.status(400).json({ error: 'Status must be Complete or Incomplete' });
  }

  const newTask: Task = {
    id: Date.now().toString(),
    name,
    status,
    description: description || ''
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { name, status, description } = req.body;
  
  if (status && status !== 'Complete' && status !== 'Incomplete') {
    return res.status(400).json({ error: 'Status must be Complete or Incomplete' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(name && { name }),
    ...(status && { status }),
    ...(description !== undefined && { description })
  };

  res.json(tasks[taskIndex]);
});

// DELETE task
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

