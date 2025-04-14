import React, { useState } from 'react';
import axios from 'axios';
import '../assets/InterferenceSimulator.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import DoubleSlitWave from './DoubleSlitWave';

const MAX_RUNS = 20;

const InterferenceSimulator: React.FC = () => {
  const [measurements, setMeasurements] = useState<number[]>([]);
  const [noise, setNoise] = useState(0);
  const [gateSequence, setGateSequence] = useState("H,H");
  const [imperfect, setImperfect] = useState(false);
  const [animated, setAnimated] = useState(false);

  const measure = async () => {
    const response = await axios.get<{ state: number }>(
      `http://localhost:3000/quantum/interference?noise=${noise}`
    );
    setMeasurements(prev => [response.data.state, ...prev].slice(0, MAX_RUNS));
  };

  const measureCustom = async () => {
    const response = await axios.get<{ state: number }>(
      `http://localhost:3000/quantum/custom-gates?gates=${gateSequence}`
    );
    setMeasurements(prev => [response.data.state, ...prev].slice(0, MAX_RUNS));
  };

  const chartData = measurements.map((m, i) => ({
    run: `Run ${MAX_RUNS - i}`,
    Result: m
  })).reverse();

  return (
    <div className="interference-container">
      <h2>Quantum Interference Simulator</h2>

      <div className="control">
        <label>Noise Level: {noise}%</label>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={noise}
          onChange={(e) => setNoise(Number(e.target.value))}
        />
        <button onClick={measure}>Run Interference (H→H)</button>
      </div>

      <div className="custom-gate">
        <input
          type="text"
          value={gateSequence}
          onChange={(e) => setGateSequence(e.target.value)}
          placeholder="e.g., H,X,Z"
        />
        <button onClick={measureCustom}>Run Gate Sequence</button>
      </div>

      <div className="toggles">
        <label>
          <input type="checkbox" checked={imperfect} onChange={() => setImperfect(!imperfect)} />
          Imperfect Interference
        </label>
        <label>
          <input type="checkbox" checked={animated} onChange={() => setAnimated(!animated)} />
          Animate Particle Hits
        </label>
      </div>

      {measurements.length > 0 && (
        <div className="chart-area">
          <h3>Last {MAX_RUNS} Runs</h3>
          <BarChart width={600} height={300} data={chartData}>
            <XAxis dataKey="run" />
            <YAxis domain={[0, 1]} tickCount={2} />
            <Tooltip />
            <Bar dataKey="Result" fill="#4caf50" />
          </BarChart>
        </div>
      )}

      <h3>Double-Slit Wave Interference</h3>
      <DoubleSlitWave imperfect={imperfect} animated={animated} />
    </div>
  );
};

export default InterferenceSimulator;
