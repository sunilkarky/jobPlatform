import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTuitions, deleteTuition } from '../services/api';
import '../styles.css';

const TuitionList = () => {
  const [tuitions, setTuitions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const response = await getTuitions();
        setTuitions(response.data.data);
      } catch (error) {
        console.error('Error fetching tuitions:', error);
      }
    };

    fetchTuitions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTuition(id, token);
      setTuitions(tuitions.filter(tuition => tuition._id !== id));
    } catch (error) {
      console.error('Error deleting tuition:', error);
    }
  };

  return (
    <div className="tuition-list-container">
      <h1>Tuition List</h1>
      <Link to="/admin/tuitions/add" className="btn add-btn">Add Tuition</Link>
      <table className="tuition-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map(tuition => (
            <tr key={tuition._id}>
              <td>{tuition.title}</td>
              <td>{tuition.description}</td>
              <td>${tuition.salary}</td>
              <td>{tuition.location}</td>
              <td>
                <Link to={`/admin/tuitions/edit/${tuition._id}`} className="btn edit-btn">Edit</Link>
                <button onClick={() => handleDelete(tuition._id)} className="btn delete-btn">Delete</button>
                <Link to={`/admin/tuitions/${tuition._id}/applicants`} className="btn view-btn">View Applicants</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionList;