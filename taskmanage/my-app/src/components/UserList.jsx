import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/userlist.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users from backend.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    const newName = window.prompt("Enter new name:", user.name);
    const newEmail = window.prompt("Enter new email:", user.email);
    if (!newName || !newEmail) return;

    axios.put(`http://localhost:8080/api/users/${user.id}`, {
      name: newName,
      email: newEmail
    }).then(() => {
      alert("User updated!");
      fetchUsers();
    });
  };

  const handleChangeRole = (user) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    axios.put(`http://localhost:8080/api/users/${user.id}`, {
      role: newRole
    }).then(() => {
      fetchUsers();
    });
  };

  const handleDeactivate = (id) => {
    if (!window.confirm("Deactivate user?")) return;

    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => fetchUsers());
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="user-container">
      <h2>Welcome, ADMIN</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <div className="actions">
                  <button onClick={() => handleEdit(u)}>Edit</button>

                  <button onClick={() => handleChangeRole(u)}>
                    {u.role === "ADMIN" ? "Set USER" : "Set ADMIN"}
                  </button>

                  <button onClick={() => handleDeactivate(u.id)}>
                    Deactivate
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;