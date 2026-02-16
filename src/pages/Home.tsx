import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types';
import { fetchTasks, updateTask } from '../api';
import './Home.css';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'Complete' ? 'Incomplete' : 'Complete';
      await updateTask(task.id, { status: newStatus });
      await loadTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleView = (task: Task) => {
    navigate(`/task/${task.id}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <div className="todo-header">
        <span className="todo-title-white">TODO</span>
        <span className="todo-title-blue"> LIST</span>
      </div>

      <div className="tasks-container" id="tasks-grid">
        {tasks.length === 0 && (
          <p className="no-tasks-message">No tasks yet. Add one with the button below.</p>
        )}
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-checkbox-container">
              <button
                className={`task-checkbox ${task.status === 'Complete' ? 'complete' : 'incomplete'}`}
                onClick={() => handleToggleStatus(task)}
                aria-label={`Mark task as ${task.status === 'Complete' ? 'Incomplete' : 'Complete'}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.name}</h3>
              <p className="task-description">
                {task.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur.'}
              </p>
            </div>
            <button className="view-button" onClick={() => handleView(task)}>
              View
            </button>
          </div>
        ))}
      </div>

      <div className="home-actions">
        <button
          type="button"
          className="view-all-link"
          onClick={() => document.getElementById('tasks-grid')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View All
        </button>
        <button className="add-todo-button" onClick={() => navigate('/add-task')}>
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Home;

