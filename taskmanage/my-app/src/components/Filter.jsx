import React from 'react';
import '../styles/filter.css';

function Filter({ status, onStatusChange, search, onSearchChange }) {
  return (
    <div className="filter">
      <select value={status} onChange={onStatusChange}>
        <option value="">All Statuses</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={search} 
        onChange={onSearchChange} 
      />
    </div>
  );
}
export default Filter;