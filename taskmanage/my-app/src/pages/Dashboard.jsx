import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import Filter from '../components/Filter';
import '../styles/dashboard.css';
import axios from 'axios';

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const filteredTasks = tasks.filter(t =>
    (statusFilter ? t.status === statusFilter : true) &&
    (search ? t.title.toLowerCase().includes(search.toLowerCase()) : true)
  );

  return (
    <div className="container dashboard">
      <h2>Dashboard</h2>

      <Filter 
        status={statusFilter}
        onStatusChange={e => setStatusFilter(e.target.value)}
        search={search}
        onSearchChange={e => setSearch(e.target.value)}
      />

      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task.id} className="task-item">
            <TaskCard {...task} />

            {/* ✅ Correct template string */}
            <Link to={`/edit-task/${task.id}`}>
              <button>Edit Task</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;