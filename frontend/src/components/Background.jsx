import React from 'react';
import busbg from '../asset/busimg.jpeg'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import '../background.css'; // Import the CSS file

const Background = () => {
  const navigate = useNavigate();

  const handleList = (e) => {
    e.preventDefault();
    navigate('/buslist');
  };

  return (
    <div className="background-container" style={{ backgroundImage: `url(${busbg})` }}>
      <div className="overlay" />
      <div className="content-container">
        <h1 className="main-heading">Welcome to the Bus Service</h1>
        <p className="subtitle">
          Your reliable partner for comfortable and safe journeys
        </p>
        <div className="button-group">
          <button onClick={handleList} className="cta-button">
            My Buses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Background;
