import React, { useRef, useEffect } from 'react';

interface DoubleSlitWaveProps {
  imperfect: boolean;
  animated: boolean;
}

const DoubleSlitWave: React.FC<DoubleSlitWaveProps> = ({ imperfect, animated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (animated) {
      let t = 0;
      const interval = setInterval(() => {
        if (!ctx) return;
        const x = t % width;
        const wave1 = Math.sin(x * 0.05);
        const wave2 = Math.sin(x * 0.05 + (imperfect ? Math.random() : Math.PI / 2));
        const interference = wave1 + wave2;
        const intensity = Math.pow(Math.abs(interference / 2), 2);

        const y = height / 2 - interference * 30;
        ctx.fillStyle = `rgba(0, 0, 255, ${intensity})`;
        ctx.fillRect(x, y, 2, 2);

        t++;
        if (t > width * 4) clearInterval(interval); // Limit to prevent infinite draw
      }, 10);

      return () => clearInterval(interval);
    } else {
      for (let x = 0; x < width; x++) {
        const wave1 = Math.sin(x * 0.05);
        const wave2 = Math.sin(x * 0.05 + (imperfect ? Math.random() : Math.PI / 2));
        const interference = wave1 + wave2;
        const intensity = Math.pow(Math.abs(interference / 2), 2);
        const y = height / 2;
        ctx.fillStyle = `rgba(0, 0, 255, ${intensity})`;
        ctx.fillRect(x, y - 30 * interference, 1, 2);
      }
    }
  }, [imperfect, animated]);

  return <canvas ref={canvasRef} width={600} height={200} style={{ border: '1px solid #ccc', background: '#fff' }} />;
};

export default DoubleSlitWave;
