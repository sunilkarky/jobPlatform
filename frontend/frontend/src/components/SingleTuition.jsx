import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTuition, applyToTuition } from '../services/api';
import '../styles.css';

const SingleTuition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const response = await getTuition(id);
        setTuition(response.data.data);
      } catch (error) {
        console.error('Error fetching tuition:', error);
      }
    };

    fetchTuition();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Please login first to apply.');
        
        return;
      }
      const { data } = await applyToTuition(id, token);
      setMessage(data.message);
    } catch (error) {
      console.error('Error applying to tuition:', error);
      setMessage('Error applying to tuition');
    }
  };

  if (!tuition) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h3>{tuition.title}</h3>
      <p>{tuition.description}</p>
      <p>Salary: ${tuition.salary}</p>
      <p>Location: {tuition.location}</p>
      <p>Duration: {tuition.duration}</p>
      <h3>Requirements</h3>
      <ul>
        {tuition.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <button onClick={handleApply}>Apply to Tuition</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SingleTuition;