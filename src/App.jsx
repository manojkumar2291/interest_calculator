import React, { useState } from 'react';
import './App.css';

function App() {
  const [principle, setPrinciple] = useState('');
  const [time, setTime] = useState('');
  const [rate, setRate] = useState('');
  const [interestType, setInterestType] = useState('simple'); // Default to simple interest
  const [calculatedInterest, setCalculatedInterest] = useState(null);
  const [total, setTotal] = useState(null);

  const [formValues, setFormValues] = useState({
    principle: '',
    time: '',
    rate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const P = parseFloat(formValues.principle);
    const T = parseFloat(formValues.time);
    const R = parseFloat(formValues.rate);

    let interest;

    if (interestType === 'simple') {
      // Calculate Simple Interest
      interest = (P * T * R) / 100;
    } else if (interestType === 'compound') {
      // Calculate Compound Interest
      interest = P * Math.pow(1 + R / 100, T) - P;
    }
    setTotal(P + interest);

    setCalculatedInterest(interest.toFixed(2));
    setPrinciple(formValues.principle);
    setTime(formValues.time);
    setRate(formValues.rate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInterestTypeChange = (e) => {
    setInterestType(e.target.value);
  };

  return (
    <div className='App'>
      <h1 className='text-2xl'>Interest Calculator</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Amount: </label>
            <input
              type="number"
              name="principle"
              value={formValues.principle}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Time: </label>
            <input
              type="number"
              name="time"
              value={formValues.time}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Rate: </label>
            <input
              type="number"
              name="rate"
              value={formValues.rate}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label>
              <input
                type="radio"
                value="simple"
                checked={interestType === 'simple'}
                onChange={handleInterestTypeChange}
              />
              Simple Interest
            </label>
            <label>
              <input
                type="radio"
                value="compound"
                checked={interestType === 'compound'}
                onChange={handleInterestTypeChange}
              />
              Compound Interest
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        {calculatedInterest !== null && (
          <div className="result">
            <p>Calculated {interestType === 'simple' ? 'Simple' : 'Compound'} Interest: <strong>{calculatedInterest}</strong></p>
            <p>Total Amount: <strong>{total.toFixed(2)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
