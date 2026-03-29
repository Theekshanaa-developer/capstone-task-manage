import React from 'react';
import '../styles/taskcard.css';

function TaskCard({ title, description, status }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Status: {status}</span>
    </div>
  );
}
export default TaskCard;