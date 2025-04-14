import { Controller, Get } from '@nestjs/common';
import { EntanglementService } from './entanglement.service';

@Controller('quantum')
export class EntanglementController {
  constructor(private readonly entanglementService: EntanglementService) {}

  @Get('entangle')
  measureEntangledQubits(): { qubitA: 0 | 1; qubitB: 0 | 1 } {
    return this.entanglementService.measureEntangledQubits();
  }
}
