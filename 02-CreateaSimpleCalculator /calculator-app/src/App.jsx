import React, { useState } from 'react';
import './App.css'; // Style as needed

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        // Evaluate the expression (caution: eval has limitations)
        setResult(eval(input));
        setInput('');
      } catch {
        setResult('Math Error');
        setInput('');
      }
    } else if (value === 'Clear') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '+'],
  ];

  return (
    <div className="calculator" style={{ maxWidth: 320, margin: '2em auto', padding: 16, borderRadius: 8, boxShadow: '0 0 10px #eee' }}>
      <h2>React Calculator</h2>
      <div className="screen" style={{ marginBottom: 12 }}>
        <input type="text" readOnly value={input} placeholder="0" style={{ fontSize: 20, width: '100%', marginBottom: 4 }} />
        <input type="text" readOnly value={result} placeholder="Result" style={{ fontSize: 20, width: '100%' }} />
      </div>
      {buttons.map((row, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          {row.map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              style={{ width: 60, height: 40, margin: 2, fontSize: 18 }}
            >
              {item}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={() => handleClick('=')}
        style={{ width: '60%', height: 40, margin: 2, fontWeight: 'bold' }}
      >
        =
      </button>
      <button
        onClick={() => handleClick('Clear')}
        style={{ width: '36%', height: 40, margin: 2, background: '#f44', color: '#fff', fontWeight: 'bold' }}
      >
        Clear
      </button>
    </div>
  );
}

export default App;
