import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../api';
import './AddTask.css';

const AddTask = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'Complete' | 'Incomplete'>('Incomplete');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a task name');
      return;
    }

    setLoading(true);
    try {
      await createTask({ name, status, description });
      navigate('/');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      <div className="todo-header">
        <span className="todo-title-white">TODO</span>
        <span className="todo-title-blue"> LIST</span>
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">TITLE</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="TODO TITLE"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">DESCRIPTION</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={6}
          />
        </div>

        <div className="form-group">
          <label className="form-label">STATUS</label>
          <div className="status-radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="Incomplete"
                checked={status === 'Incomplete'}
                onChange={() => setStatus('Incomplete')}
              />
              <span>Incomplete</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="Complete"
                checked={status === 'Complete'}
                onChange={() => setStatus('Complete')}
              />
              <span>Complete</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;

