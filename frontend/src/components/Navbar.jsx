import React, { useState } from 'react';
import buslogo from '../asset/buslogo.png';
import SignupForm from './Signupform';

const Navbar = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);

  const toggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold">
          <img src={buslogo} alt="Logo" className="h-12" />
        </div>
        <button
          onClick={toggleSignupForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </nav>

      {showSignupForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md relative">
            <button
              onClick={toggleSignupForm}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              &times; {/* Close button */}
            </button>
            <SignupForm toggleForm={toggleSignupForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
