import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const TuitionCard = ({ tuition }) => {
  return (
    <div className="tuition-card">
      <h2>{tuition.title}</h2>
      <p>{tuition.description}</p>
      <p>Salary: NPR{tuition.salary}</p>
      <p>Location: {tuition.location}</p>
      <Link to={`/tuitions/${tuition._id}`} className="btn">View Details</Link>
    </div>
  );
};

export default TuitionCard;