import React, { useState, useEffect } from 'react';
import { getUsers, addUser, deleteUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const { data } = await getUsers(token);
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const userData = { name, email, password };
      const { data } = await addUser(userData, token);
      setMessage(data.message);
      setUsers([...users, data.data]);
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error adding user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const { data } = await deleteUser(id, token);
      setMessage(data.message);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {message && <p>{message}</p>}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;