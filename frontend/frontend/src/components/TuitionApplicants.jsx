import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTuition } from '../services/api';
import '../styles.css';

const TuitionApplicants = () => {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);

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

  if (!tuition) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Applicants for {tuition.title}</h1>
      <table className="applicants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {tuition.applications.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionApplicants;