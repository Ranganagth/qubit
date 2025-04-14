// // QuantumSimulator.tsx
// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function QuantumSimulator() {
//   const [results, setResults] = useState({ 0: 0, 1: 0 });
//   const [trials, setTrials] = useState(1000);
//   const [alpha, setAlpha] = useState(1 / Math.sqrt(2));
//   const [beta, setBeta] = useState(1 / Math.sqrt(2));

//   const measureQubit = (alpha: number, beta: number) => {
//     const prob0 = alpha ** 2;
//     const prob1 = beta ** 2;
//     const rand = Math.random();
//     return rand < prob0 ? 0 : 1;
//   };

//   const runSimulation = () => {
//     let resultCount = { 0: 0, 1: 0 };
//     for (let i = 0; i < trials; i++) {
//       const result = measureQubit(alpha, beta);
//       resultCount[result]++;
//     }
//     setResults(resultCount);
//   };

//   const chartData = {
//     labels: ['0', '1'],
//     datasets: [
//       {
//         label: 'Measurement Results',
//         data: [results[0], results[1]],
//         backgroundColor: ['#4ade80', '#f87171'],
//       }
//     ]
//   };

//   return (
//     <div className="p-4">
//       <Card className="max-w-xl mx-auto">
//         <CardContent>
//           <h2 className="text-xl font-bold mb-4">Quantum Superposition Simulator</h2>
//           <p>Alpha (|0⟩ coefficient): {alpha.toFixed(2)}</p>
//           <p>Beta (|1⟩ coefficient): {beta.toFixed(2)}</p>
//           <p>Trials: {trials}</p>
//           <Button onClick={runSimulation} className="mt-4">Run Simulation</Button>
//           <div className="mt-6">
//             <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false }}}} />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
