import React, { useState } from "react";

function App() {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const fetchMessage = async () => {
    try {
      console.log('Attempting to fetch from backend...');
      // Use the full URL including the port
      const apiUrl = `http://${window.location.hostname}:4000/api/greet`;
      console.log('Fetching from:', apiUrl);
      
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('Received data:', data);
      setResponse(data.message);
      setError('');
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Error fetching message: ${error.message}`);
      setResponse('');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2em auto", textAlign: 'center' }}>
      <h2>API Interaction Demo</h2>
      <button 
        onClick={fetchMessage} 
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Get Greeting from Backend
      </button>
      {response && (
        <p style={{ marginTop: 20, fontWeight: 'bold', color: 'green' }}>
          {response}
        </p>
      )}
      {error && (
        <p style={{ marginTop: 20, color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default App;