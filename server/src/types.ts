export interface Task {
  id: string;
  name: string;
  status: 'Complete' | 'Incomplete';
  description?: string;
}

