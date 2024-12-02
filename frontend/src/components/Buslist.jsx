import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bus1 from '../asset/bus1.jpeg';
import bus2 from '../asset/bus2.jpeg';
import bus3 from '../asset/bus3.jpg';
import bus4 from '../asset/bus4.jpeg';
import bus5 from '../asset/bus5.jpeg';
import '../buslist.css';

const busImages = {
  "City Express": bus1,
  "Rapid Transit": bus2,
  "Morning Star": bus3,
  "Night Rider": bus4,
  "Weekend Shuttle": bus5,
};

const BusList = ({ isLoggedIn }) => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');
  const [route, setRoute] = useState(''); // State for route filtering
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/buses');
        const data = await response.json();
        console.log('Fetched Buses:', data); // Debugging log
        setBuses(data);
      } catch (error) {
        setError('Failed to fetch buses. Please try again.');
      }
    };

    fetchBuses();
  }, []);

  const handleBookBus = (busId, busRoute) => {
    if (isLoggedIn) {
      navigate(`/book-bus/${busId}`, { state: { busRoute } });
    } else {
      navigate('/login');
    }
  };

  // Filter buses by route
  const filteredBuses = buses.filter((bus) =>
    route ? bus.route.toLowerCase().includes(route.toLowerCase()) : true
  );

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-6">Available Buses</h2>

      {/* Route Filter */}
       <div className="filter-container">
        <div className="search-wrapper">
          <input
            type="text"
            id="routeFilter"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            placeholder="Search by route (e.g., City A - City B)"
            className="search-input"
          />
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <div className="results-count">
          {filteredBuses.length} {filteredBuses.length === 1 ? 'bus' : 'buses'} found
        </div>
      </div>

      {/* Bus List */}
      <div className="grid">
        {filteredBuses.map((bus) => (
          <div key={bus.busID} className="border">
            <img
              src={busImages[bus.busName] || bus1}
              alt={bus.busName}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="">{bus.busName}</h3>
            <p className="">Route: {bus.route}</p>
            <p className="">Start Time: {bus.startTime}</p>
            <p className="">Destination Time: {bus.destinationTime}</p>

            <button
              onClick={() => handleBookBus(bus.busID, bus.route)}
              className="button"
            >
              {isLoggedIn ? 'Book' : 'Login to Book'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
