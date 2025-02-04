import React, { useEffect, useState } from 'react';
import { getTuitions } from '../services/api';
import TuitionCard from './TuitionCard';
import Footer from './Footer';
import '../styles.css';

const HomePage = () => {
  const [tuitions, setTuitions] = useState([]);

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

  return (
    <>
      <div className="container">
        <h1>Available Tuitions</h1>
        <div className="tuition-card-container">
          {tuitions.length > 0 ? (
            tuitions.map(tuition => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))
          ) : (
            <p>No tuitions available</p>
          )}
        </div>
      </div>
      
    </>
  );
};

export default HomePage;