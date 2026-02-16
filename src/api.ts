import type { Task } from './types';

const STORAGE_KEY = 'todo-list-tasks';

function getTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export const fetchTasks = async (): Promise<Task[]> => {
  return getTasks();
};

export const fetchTask = async (id: string): Promise<Task> => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error('Failed to fetch task');
  return task;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const tasks = getTasks();
  const newTask: Task = {
    id: generateId(),
    name: task.name,
    status: task.status,
    description: task.description,
  };
  tasks.push(newTask);
  setTasks(tasks);
  return newTask;
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new Error('Failed to update task');
  tasks[index] = { ...tasks[index], ...updates };
  setTasks(tasks);
  return tasks[index];
};

export const deleteTask = async (id: string): Promise<void> => {
  const tasks = getTasks().filter((t) => t.id !== id);
  setTasks(tasks);
};
