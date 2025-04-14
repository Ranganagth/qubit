import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function App() {
  type QubitOutcome = 0 | 1;

  type Counts = Record<QubitOutcome, number>;

  const [counts, setCounts] = useState<Counts>({ 0: 0, 1: 0 });

  const measureQubit = async () => {
    const res = await axios.post<{ outcome: QubitOutcome }>('http://localhost:3000/qubit/measure');
    const outcome = res.data.outcome;
    setCounts(prev => ({ ...prev, [outcome]: prev[outcome] + 1 }));
  };

  const data = [
    { outcome: '0', count: counts[0] },
    { outcome: '1', count: counts[1] },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Quantum Qubit Measurement</h1>
      <button onClick={measureQubit}>Measure Qubit</button>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="outcome" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default App;
