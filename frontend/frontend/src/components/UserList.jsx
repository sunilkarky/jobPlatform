import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(token);
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, token);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <Link to="/admin/users/add" className="btn add-btn">Add User</Link>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/admin/users/edit/${user._id}`} className="btn edit-btn">Edit</Link>
                <button onClick={() => handleDelete(user._id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;