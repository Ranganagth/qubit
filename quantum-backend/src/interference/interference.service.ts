import { Injectable } from '@nestjs/common';

@Injectable()
export class InterferenceService {
  simulateDoubleHadamard(noiseLevel: number): number {
    const noise = Math.random() * 100;
    return noise < noiseLevel ? Math.round(Math.random()) : 0;
  }

  simulateWithGates(gates: string[]): number {
    let state = [1, 0]; // |0⟩

    for (const gate of gates) {
      switch (gate) {
        case 'X':
          state = [state[1], state[0]];
          break;
        case 'Z':
          state = [state[0], -state[1]];
          break;
        case 'H':
          const [a, b] = state;
          state = [(a + b) / Math.sqrt(2), (a - b) / Math.sqrt(2)];
          break;
      }
    }

    const prob0 = Math.pow(state[0], 2);
    return Math.random() < prob0 ? 0 : 1;
  }
}