import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SingleTuition from './components/SingleTuition';
import Blogs from './components/Blogs'; // Ensure you have this component
import About from './components/About'; // Ensure you have this component
import Contact from './components/Contact'; // Ensure you have this component
import Login from './components/Login';
import Navbar from './components/Navbar';
import TuitionList from './components/TuitionList';
import TuitionForm from './components/TuitionForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';
import AdminDashboard from './components/AdminDashboard';
import TuitionApplicants from './components/TuitionApplicants';
import Footer from './components/Footer';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tuitions/:id" element={<SingleTuition />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/tuitions" element={<ProtectedRoute role="admin"><TuitionList /></ProtectedRoute>} />
        <Route path="/admin/tuitions/add" element={<ProtectedRoute role="admin"><TuitionForm /></ProtectedRoute>} />
        <Route path="/admin/tuitions/edit/:id" element={<ProtectedRoute role="admin"><TuitionForm /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><UserList /></ProtectedRoute>} />
        <Route path="/admin/users/add" element={<ProtectedRoute role="admin"><UserForm /></ProtectedRoute>} />
        <Route path="/admin/users/edit/:id" element={<ProtectedRoute role="admin"><UserForm /></ProtectedRoute>} />
        <Route path="/admin/tuitions/:id/applicants" element={<TuitionApplicants />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;