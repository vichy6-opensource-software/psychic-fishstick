import React, { useState } from 'react';

const calculateDates = (start) => {
  const msPerDay = 24*60*60*1000;
  const add = days => new Date(start.getTime() + days * msPerDay);
  const fmt = d => d.toLocaleDateString('en-US');

  return {
    'Cycle Start': fmt(start),
    'Bill in App (+4d)': fmt(add(4)),
    'Funds Available (+16d)': fmt(add(16)),
    'Autopay Draft (+17d)': fmt(add(17)),
    'Due Date (+20d)': fmt(add(20)),
    'Cycle Close (+30d)': fmt(add(30)),
    'Suspension Risk (+37d)': fmt(add(37)),
    'Number Loss (+90d)': fmt(add(90))
  };
};

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [results, setResults] = useState(null);

  const onCalculate = () => {
    if (!startDate) return;
    const dates = calculateDates(new Date(startDate));
    setResults(dates);
  };

  return (
    <div className="container">
      <label htmlFor="start">Billing Start Date:</label>
      <input
        id="start"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <button onClick={onCalculate}>Calculate</button>

      {results && (
        <table>
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([key, date]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
