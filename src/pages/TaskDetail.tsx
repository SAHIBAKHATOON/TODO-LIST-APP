import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task } from '../types';
import { fetchTask, updateTask, deleteTask } from '../api';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'Complete' | 'Incomplete'>('Incomplete');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

  const loadTask = async () => {
    if (!id) return;
    try {
      const data = await fetchTask(id);
      setTask(data);
      setName(data.name);
      setDescription(data.description || '');
      setStatus(data.status);
    } catch (error) {
      console.error('Error loading task:', error);
      alert('Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!id || !name.trim()) {
      alert('Please enter a task name');
      return;
    }

    setSaving(true);
    try {
      await updateTask(id, { name, description, status });
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleToggleStatus = () => {
    setStatus(status === 'Complete' ? 'Incomplete' : 'Complete');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!task) {
    return <div className="error">Task not found</div>;
  }

  return (
    <div className="task-detail-container">
      <div className="todo-header">
        <span className="todo-title-white">TODO</span>
        <span className="todo-title-blue"> LIST</span>
      </div>

      <div className="task-detail-content">
        <div className="status-section">
          <label className="status-label">FINISH</label>
          <button
            className={`status-checkbox ${status === 'Complete' ? 'complete' : 'incomplete'}`}
            onClick={handleToggleStatus}
            aria-label={`Mark task as ${status === 'Complete' ? 'Incomplete' : 'Complete'}`}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label className="form-label">TITLE</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="TODO TITLE"
            />
          </div>

          <div className="form-group">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Zombie ipsum brains reversus ab corobellum viral inferno, brein nam rick mend grimes molum cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit, morbo basol ganglia vel maleficia?"
              rows={8}
            />
          </div>
        </div>

        <div className="action-buttons">
          <button className="update-button" onClick={handleUpdate} disabled={saving}>
            {saving ? 'Updating...' : 'UPDATE'}
          </button>
          <button className="delete-button" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

