import React, { useState } from 'react';
import axios from 'axios';

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError('Please fill in both the title and description.');
      return;
    }

    setError('');
    setSuccess('');

    const task = { title, description, status };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/tasks',
        task
      );
      console.log('Task created:', response.data);

      setSuccess('Task created successfully!');
      setTitle('');
      setDescription('');
      setStatus('TODO');
    } catch (err) {
      console.error('Error creating task:', err.response || err);
      setError('Failed to create task. Check console for details.');
    }
  };

  return (
    <div className="container">
      <h2>Create Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br /><br />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select><br /><br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;