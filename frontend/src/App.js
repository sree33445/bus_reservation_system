import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BusList from './components/Buslist';
import BookingPage from './components/BusBookingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Background from './components/Background';
import SignupForm from './components/Signupform';
import BillingPage from './components/BillingPage';
import ConfirmationPage from './components/ConfirmationPage';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Background />} />
        <Route path="/buslist" element={<BusList isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/billing' element={<BillingPage />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
        <Route path='/feedback' element={<FeedbackForm />} />
        <Route
          path="/book-bus/:busId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
