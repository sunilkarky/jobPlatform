import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul className="admin-dashboard-nav">
          <li><a href="/admin/tuitions">Manage Tuitions</a></li>
          <li><a href="/admin/users">Manage Users</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;