import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTuition, addTuition, editTuition } from '../services/api';
import '../styles.css';

const TuitionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    requirements: '',
    duration: '',
  });

  useEffect(() => {
    if (id) {
      const fetchTuition = async () => {
        try {
          const response = await getTuition(id);
          setFormData(response.data.data);
        } catch (error) {
          console.error('Error fetching tuition:', error);
        }
      };

      fetchTuition();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await editTuition(id, formData, token);
      } else {
        await addTuition(formData, token);
      }
      navigate('/admin/tuitions');
    } catch (error) {
      console.error('Error saving tuition:', error);
    }
  };

  return (
    <div className="tuition-form-container">
      <h1>{id ? 'Edit Tuition' : 'Add Tuition'}</h1>
      <form onSubmit={handleSubmit} className="tuition-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="requirements">Requirements</label>
        <input
          type="text"
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          required
        />
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn submit-btn">{id ? 'Update' : 'Add'} Tuition</button>
      </form>
    </div>
  );
};

export default TuitionForm;