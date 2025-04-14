import { Injectable } from '@nestjs/common';

@Injectable()
export class EntanglementService {
  measureEntangledQubits(): { qubitA: 0 | 1; qubitB: 0 | 1 } {
    const outcome = Math.random() < 0.5 ? 0 : 1;
    return { qubitA: outcome, qubitB: outcome };
  }
}
