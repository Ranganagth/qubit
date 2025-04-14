import React, { useState } from 'react';
import axios from 'axios';
import '../assets/EntanglementSimulator.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

type QubitPair = {
  qubitA: number;
  qubitB: number;
};

const MAX_HISTORY = 20;

const EntanglementSimulator: React.FC = () => {
  const [result, setResult] = useState<QubitPair | null>(null);
  const [measurements, setMeasurements] = useState<QubitPair[]>([]);

  const measureQubits = async () => {
    try {
      const response = await axios.get<QubitPair>('http://localhost:3000/quantum/entangle');
      const newResult = response.data;
      setResult(newResult);
      setMeasurements(prev =>
        [newResult, ...prev].slice(0, MAX_HISTORY)
      );
    } catch (error) {
      console.error('Measurement failed:', error);
    }
  };

  const chartData = measurements.map((m, i) => ({
    name: `Run ${MAX_HISTORY - i}`,
    A: m.qubitA,
    B: m.qubitB,
  })).reverse();

  return (
    <div className="entanglement-container">
      <h2>Entangled Qubit Simulator</h2>
      <button className="measure-btn" onClick={measureQubits}>Measure Qubits</button>

      {result && (
        <>
          <div className="qubit-pair">
            <div className={`qubit ${result.qubitA === 0 ? 'zero' : 'one'} animate`}>A</div>
            <div className={`qubit ${result.qubitB === 0 ? 'zero' : 'one'} animate`}>B</div>
          </div>

          <div className="result-info">
            <p>Qubit A: {result.qubitA}</p>
            <p>Qubit B: {result.qubitB}</p>
            <p className="status">
              {result.qubitA === result.qubitB ? 'Entanglement Verified!' : 'Not Entangled'}
            </p>
          </div>

          <div className="chart-wrapper">
            <h3>Last 20 Measurements</h3>
            <BarChart width={600} height={300} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} tickCount={2} />
              <Tooltip />
              <Bar dataKey="A" fill="#3f51b5" name="Qubit A" />
              <Bar dataKey="B" fill="#e91e63" name="Qubit B" />
            </BarChart>
          </div>
        </>
      )}
    </div>
  );
};

export default EntanglementSimulator;
