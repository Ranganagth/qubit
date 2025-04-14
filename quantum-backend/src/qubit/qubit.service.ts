import { Injectable } from '@nestjs/common';

@Injectable()
export class QubitService {
  alpha = 1 / Math.sqrt(2);
  beta = 1 / Math.sqrt(2);

  measure(): { outcome: 0 | 1 } {
    const prob0 = this.alpha ** 2;
    const rand = Math.random();
    return { outcome: rand < prob0 ? 0 : 1 };
  }
}
