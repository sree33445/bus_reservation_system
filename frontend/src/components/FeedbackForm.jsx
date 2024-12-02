import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../feedback.css';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [name,setName] = useState('')
  const [route,setRoute] = useState('')
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setName(queryParams.get('name') || '');
    setRoute(queryParams.get('route') || '')
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/feedback/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, route, feedback }),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        setFeedback('');
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <div className="feedback-header">
          <h1>Feedback Form</h1>
          <p>Thank you for traveling on the route: <span>{route}</span></p>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your thoughts about your journey..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
        {name && (
          <div className="feedback-user">
            Feedback from: <span>{name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;